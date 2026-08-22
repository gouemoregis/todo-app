# Continuous Integration

This document explains the GitHub Actions workflow used by this project.

Workflow file:

```text
.github/workflows/ci.yml
```

## Goal

The CI workflow checks that the project still works after code is pushed to GitHub.

The project has three main checks:

- the Django backend must install, pass Django checks, and pass backend tests
- the React frontend must install, pass linting, and build successfully
- the Docker images must build successfully

The workflow does not deploy the application yet. It only verifies the code and Docker images.

## Trigger

```yaml
on:
  push:
  pull_request:
```

`push` runs the workflow when commits are pushed to GitHub.

`pull_request` runs the workflow when a pull request is opened or updated.

This means GitHub checks the project automatically before or after code is added to the remote repository.

## Jobs

```yaml
jobs:
```

`jobs` contains the main units of work that GitHub Actions runs.

This project uses three jobs:

- `backend`
- `frontend`
- `docker`

The backend and frontend jobs can run independently because they test different parts of the project.

The Docker job depends on both of them, so Docker images are built only after the backend and frontend checks pass.

## Backend Job

```yaml
backend:
  runs-on: ubuntu-latest
```

`backend` is the job name.

`runs-on: ubuntu-latest` tells GitHub Actions to run the job on a temporary Ubuntu machine.

That machine starts empty. It does not already contain the project files, the Python virtual environment, or the dependencies.

### Checkout

```yaml
- name: Checkout code
  uses: actions/checkout@v6
```

This step downloads the repository code into the temporary GitHub Actions machine.

Without this step, the next commands would fail because files like `backend/requirements.txt` and `backend/manage.py` would not exist on the runner.

### Python Setup

```yaml
- name: Set up Python
  uses: actions/setup-python@v6
  with:
    python-version: '3.12'
```

This step installs Python for the backend job.

The project uses Python 3.12 locally and the backend Docker image also uses Python 3.12:

```dockerfile
FROM python:3.12-slim
```

Using Python 3.12 in CI keeps the backend environment close to the local and Docker environments.

`with` passes configuration to the GitHub Action.

Here, `python-version: '3.12'` tells `actions/setup-python` which Python version to install.

### Backend Dependencies

```yaml
- name: Install backend dependencies
  working-directory: backend
  run: pip install -r requirements.txt
```

This step installs the Python dependencies.

`working-directory: backend` means the command runs from the `backend/` folder.

That matters because `requirements.txt` is located here:

```text
backend/requirements.txt
```

So this CI step behaves like:

```bash
cd backend
pip install -r requirements.txt
```

`pip install -r requirements.txt` installs the exact backend packages listed in the requirements file.

### Django Checks

```yaml
- name: Run Django checks
  working-directory: backend
  run: python manage.py check
```

This step asks Django to inspect the project configuration.

It does not start the server and it does not run the test suite.

It checks for configuration problems such as invalid app setup, broken settings, or framework-level issues Django can detect before runtime.

### Backend Tests

```yaml
- name: Run backend tests
  working-directory: backend
  run: python manage.py test
```

This step runs the Django test suite.

In this project, the backend tests check the Todo API:

- list todos
- create a todo
- get one todo
- return 404 when a todo does not exist
- update a todo
- delete a todo

In GitHub Actions, the workflow currently does not provide `DATABASE_URL`.

Because of this code in `backend/config/settings.py`, Django falls back to SQLite:

```python
DATABASE_URL = os.getenv('DATABASE_URL')

if DATABASE_URL:
    DATABASES = {
        'default': dj_database_url.parse(DATABASE_URL)
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
```

That means the CI can run backend tests without connecting to Neon.

Neon stays the real application database for local Docker and normal development, but SQLite is useful for this first CI test environment.

## Frontend Job

```yaml
frontend:
  runs-on: ubuntu-latest
```

`frontend` is the job name.

Like the backend job, it runs on a temporary Ubuntu machine.

The frontend job checks the React/Vite application.

### Checkout

```yaml
- name: Checkout code
  uses: actions/checkout@v6
```

This step downloads the repository code into the frontend job machine.

Each job has its own clean machine, so the frontend job needs its own checkout even if the backend job already checked out the code.

### Node Setup

```yaml
- name: Set up Node
  uses: actions/setup-node@v6
  with:
    node-version: '24'
    cache: npm
    cache-dependency-path: frontend/package-lock.json
```

This step installs Node.js for the frontend job.

`node-version: '24'` matches the Node major version used locally.

`cache: npm` enables npm dependency caching. This helps future workflow runs finish faster because GitHub can reuse downloaded package data.

`cache-dependency-path: frontend/package-lock.json` tells GitHub Actions where the npm lockfile is.

This is needed because the frontend lockfile is not at the repository root. It is inside:

```text
frontend/package-lock.json
```

### Frontend Dependencies

```yaml
- name: Install frontend dependencies
  working-directory: frontend
  run: npm ci
```

This step installs the frontend dependencies.

`working-directory: frontend` makes the command run from the React project folder.

`npm ci` installs dependencies from `package-lock.json`.

It is preferred in CI because it is stricter and more reproducible than `npm install`.

`npm install` can update the lockfile, while `npm ci` expects the lockfile to already describe the exact dependency tree.

### Lint

```yaml
- name: Run frontend lint
  working-directory: frontend
  run: npm run lint
```

This step runs ESLint.

In `frontend/package.json`, the lint script is:

```json
"lint": "eslint ."
```

So `npm run lint` checks the frontend code for JavaScript and React issues.

### Build

```yaml
- name: Build frontend
  working-directory: frontend
  run: npm run build
```

This step builds the React application.

In `frontend/package.json`, the build script is:

```json
"build": "vite build"
```

So `npm run build` runs Vite's production build.

This catches errors that may not appear until the frontend is compiled.

## Docker Job

```yaml
docker:
  runs-on: ubuntu-latest
  needs:
    - backend
    - frontend
```

`docker` is the job name.

This job checks that Docker can build the backend and frontend images.

`needs` creates a dependency between jobs.

The Docker job waits for both:

- `backend`
- `frontend`

If either job fails, the Docker job does not run.

This order is useful because there is no need to build Docker images if the application code already fails its basic checks.

### Docker Checkout

```yaml
- name: Checkout code
  uses: actions/checkout@v6
```

The Docker job also needs to download the repository code.

Jobs do not share their file systems, so the Docker job cannot reuse the checkout from the backend or frontend job.

### Backend Docker Build

```yaml
- name: Build backend Docker image
  run: docker build -t todo-backend:ci ./backend
```

This step builds the backend Docker image.

`docker build` creates an image from a Dockerfile and a build context.

`-t todo-backend:ci` gives the image a temporary CI tag.

The tag has two parts:

```text
todo-backend:ci
```

`todo-backend` is the image name.

`ci` is the image tag.

`./backend` is the build context. Docker looks inside that folder and uses `backend/Dockerfile`.

### Frontend Docker Build

```yaml
- name: Build frontend Docker image
  run: docker build -t todo-frontend:ci ./frontend
```

This step builds the frontend Docker image.

`./frontend` is the build context, so Docker uses:

```text
frontend/Dockerfile
```

The image is tagged as:

```text
todo-frontend:ci
```

This image is not pushed to a registry yet.

For now, the CI only proves that the image can be built successfully.

## Current Pipeline

The current CI pipeline is:

```text
git push
   |
   v
GitHub Actions
   |
   +--> backend job
   |      - checkout
   |      - set up Python
   |      - install dependencies
   |      - run Django checks
   |      - run backend tests
   |
   +--> frontend job
   |      - checkout
   |      - set up Node
   |      - install dependencies
   |      - run lint
   |      - build frontend
   |
   v
docker job
   - checkout
   - build backend image
   - build frontend image
```

## What Comes Later

Later, the CI/CD pipeline can be extended with:

- GitHub Secrets
- Docker image publishing
- GitHub Container Registry
- Kubernetes deployment
- Helm

Those steps are not part of the current workflow yet.
