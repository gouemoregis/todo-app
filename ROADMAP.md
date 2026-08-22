# Roadmap - Todo App Full Stack

Derniere mise a jour : 2026-08-22

Cette roadmap resume ce qui a deja ete vu et ce qu'il reste a voir.

Notation :

- [x] fait / valide
- [ ] pas encore fait

## Methode de travail

- [x] Avancer en petites etapes
- [x] Faire une action a la fois
- [x] Expliquer le code au moment ou il apparait
- [x] Tester apres chaque etape importante
- [x] Garder un checkpoint de reprise
- [ ] Continuer a mettre a jour cette roadmap pendant la suite du projet

## Phase 1 - Initialisation du projet

- [x] Creer le dossier `todo-app/`
- [x] Entrer dans le dossier du projet
- [x] Initialiser Git avec `git init`
- [x] Comprendre le role du dossier `.git`
- [x] Comprendre pourquoi on versionne le projet des le debut
- [x] Creer le dossier `backend/`

## Phase 2 - Environnement Python

- [x] Creer l'environnement virtuel Python dans `backend/.venv/`
- [x] Comprendre le role de `.venv`
- [x] Comprendre pourquoi on isole les dependances Python
- [x] Ajouter `.venv` dans `.gitignore`

## Phase 3 - Installation de Django

- [x] Installer Django
- [x] Creer le projet Django
- [x] Comprendre le role de `manage.py`
- [x] Comprendre le role de `config/settings.py`
- [x] Comprendre le role de `config/urls.py`

## Phase 4 - Premier test Django

- [x] Lancer le serveur Django avec `python manage.py runserver`
- [x] Ouvrir l'URL locale Django
- [x] Valider que Django demarre correctement

## Phase 5 - Django REST Framework

- [x] Installer Django REST Framework
- [x] Ajouter `rest_framework` dans `INSTALLED_APPS`
- [x] Comprendre le role de `INSTALLED_APPS`
- [x] Comprendre ce que DRF ajoute a Django

## Phase 6 - Application Django `todos`

- [x] Creer l'application Django `todos`
- [x] Comprendre la difference entre le projet `config` et l'application `todos`
- [x] Ajouter `todos` dans `INSTALLED_APPS`

## Phase 7 - Neon PostgreSQL

- [x] Creer un projet Neon
- [x] Choisir la region Europe Central / Frankfurt
- [x] Recuperer la chaine de connexion PostgreSQL
- [x] Comprendre les parties de la chaine : user, password, host, database, port, SSL

## Phase 8 - Driver PostgreSQL

- [x] Installer `psycopg[binary]`
- [x] Comprendre pourquoi Django a besoin d'un driver PostgreSQL

## Phase 9 - Variables d'environnement

- [x] Creer `backend/.env`
- [x] Ajouter `DATABASE_URL` dans `.env`
- [x] Ajouter `.env` dans `.gitignore`
- [x] Installer `python-dotenv`
- [x] Installer `dj-database-url`
- [x] Configurer Django pour lire `DATABASE_URL`
- [x] Comprendre pourquoi les secrets ne doivent pas partir sur GitHub

## Phase 10 - Connexion Django vers Neon

- [x] Configurer `DATABASES` dans `settings.py`
- [x] Utiliser Neon/PostgreSQL quand `DATABASE_URL` existe
- [x] Ajouter un fallback SQLite pour les environnements sans `DATABASE_URL`
- [x] Lancer `python manage.py migrate`
- [x] Verifier que les tables Django sont creees dans Neon

## Phase 11 - Modele Todo

- [x] Creer le modele `Todo`
- [x] Ajouter le champ `title`
- [x] Ajouter le champ `description`
- [x] Ajouter le champ `completed`
- [x] Ajouter le champ `created_at`
- [x] Ajouter le champ `updated_at`
- [x] Ajouter la methode `__str__`
- [x] Comprendre le role de `models.Model`
- [x] Comprendre les champs Django principaux utilises

## Phase 12 - Migrations Todo

- [x] Generer la migration `todos.0001_initial`
- [x] Comprendre `makemigrations`
- [x] Appliquer la migration avec `migrate`
- [x] Verifier la table `todos_todo` dans Neon

## Phase 13 - Django Admin

- [x] Enregistrer `Todo` dans Django Admin
- [x] Creer un superuser
- [x] Acceder a `/admin/`
- [x] Creer une Todo depuis l'admin
- [x] Verifier que la Todo est enregistree dans Neon

## Phase 14 - Serializer

- [x] Creer `backend/todos/serializers.py`
- [x] Creer `TodoSerializer`
- [x] Utiliser `serializers.ModelSerializer`
- [x] Exposer `id`, `title`, `description`, `completed`, `created_at`, `updated_at`
- [x] Comprendre le chemin Django Model -> Serializer -> JSON

## Phase 15 - Premier endpoint API

- [x] Choisir `APIView` pour apprendre clairement les methodes HTTP
- [x] Creer `TodoListView`
- [x] Ajouter `GET /api/todos/`
- [x] Creer `backend/todos/urls.py`
- [x] Brancher `todos.urls` dans `config/urls.py`
- [x] Valider l'URL finale `/api/todos/`
- [x] Voir le JSON retourne par l'API

## Phase 16 - CRUD API

- [x] Ajouter `GET /api/todos/`
- [x] Ajouter `POST /api/todos/`
- [x] Ajouter `GET /api/todos/<id>/`
- [x] Ajouter `PATCH /api/todos/<id>/`
- [x] Ajouter `DELETE /api/todos/<id>/`
- [x] Tester chaque operation manuellement
- [x] Verifier la persistance dans Neon

## Phase 17 - Tests backend

- [x] Ajouter un test pour `GET /api/todos/`
- [x] Ajouter un test pour `POST /api/todos/`
- [x] Ajouter un test pour `GET detail`
- [x] Ajouter un test pour `GET detail 404`
- [x] Ajouter un test pour `PATCH`
- [x] Ajouter un test pour `DELETE`
- [x] Valider les 6 tests backend CRUD

## Phase 18 - Requirements

- [x] Creer `backend/requirements.txt`
- [x] Figer les dependances avec `pip freeze`
- [x] Ajouter `django-cors-headers` dans `requirements.txt`
- [x] Comprendre pourquoi on fige les dependances

## Phase 19 - Frontend React

- [x] Creer le dossier `frontend/`
- [x] Initialiser React avec Vite
- [x] Installer les dependances frontend
- [x] Lancer le serveur Vite avec `npm run dev`
- [x] Voir l'ecran React par defaut
- [x] Remplacer l'ecran par un composant minimal `Todo App`

## Phase 20 - React local

- [x] Afficher une liste locale de Todos
- [x] Utiliser `useState`
- [x] Ajouter une Todo locale
- [x] Supprimer une Todo locale
- [x] Basculer le statut `completed`
- [x] Utiliser un formulaire avec `onSubmit`
- [x] Utiliser un input controle
- [x] Bloquer les Todos vides
- [x] Nettoyer le titre avec `trim()`
- [x] Extraire `TodoItem`
- [x] Extraire `TodoForm`
- [x] Extraire `TodoList`

## Phase 21 - Connexion React vers Django

- [x] Utiliser `useEffect`
- [x] Faire un `fetch` vers `/api/todos/`
- [x] Comprendre requete HTTP, Promise, response, JSON et state React
- [x] Initialiser `todos` avec les donnees du backend
- [x] Confirmer que l'API Django repond en `200 OK`

## Phase 22 - CORS

- [x] Identifier l'erreur CORS dans le navigateur
- [x] Comprendre pourquoi React et Django sont deux origines differentes
- [x] Installer `django-cors-headers`
- [x] Ajouter `corsheaders` dans `INSTALLED_APPS`
- [x] Ajouter `CorsMiddleware`
- [x] Autoriser `http://localhost:5173`
- [x] Valider que React peut lire l'API Django

## Phase 23 - CRUD frontend connecte

- [x] Ajouter une Todo depuis React avec `POST`
- [x] Afficher la Todo creee par Django
- [x] Basculer `completed` avec `PATCH`
- [x] Modifier le titre et la description avec `PATCH`
- [x] Supprimer avec `DELETE`
- [x] Ne pas lire de JSON apres un `204 No Content`
- [x] Valider la persistance apres rechargement

## Phase 24 - Interface React

- [x] Installer Bootstrap
- [x] Importer le CSS Bootstrap
- [x] Ajouter un champ `description`
- [x] Utiliser les classes Bootstrap pour les champs et boutons
- [x] Installer `bootstrap-icons`
- [x] Ajouter les icones ajouter, modifier, terminer, reouvrir, supprimer
- [x] Afficher les Todos dans un tableau Bootstrap
- [x] Barrer les Todos terminees
- [x] Gerer le chargement initial
- [x] Gerer l'erreur API
- [x] Gerer la liste vide

## Phase 25 - Validation frontend

- [x] Lancer `npm run build`
- [x] Lancer `npm run lint`
- [x] Corriger les bugs JSX rencontres
- [x] Valider manuellement ajout, edition, suppression et changement de statut

## Phase 26 - Docker backend

- [x] Creer `backend/Dockerfile`
- [x] Creer `backend/.dockerignore`
- [x] Comprendre les instructions principales du Dockerfile
- [x] Construire l'image backend
- [x] Lancer le backend dans un container
- [x] Garder Neon comme base externe
- [x] Passer la connexion Neon via variable d'environnement

## Phase 27 - Docker frontend

- [x] Creer `frontend/Dockerfile`
- [x] Creer `frontend/.dockerignore`
- [x] Construire l'image frontend
- [x] Lancer le frontend dans un container

## Phase 28 - Docker Compose

- [x] Creer `docker-compose.yml`
- [x] Declarer le service `backend`
- [x] Declarer le service `frontend`
- [x] Comprendre `services`
- [x] Comprendre `ports`
- [x] Ne pas ajouter PostgreSQL dans Compose
- [x] Valider `docker compose up` de bout en bout
- [x] Verifier que le frontend container parle bien au backend container
- [x] Verifier que le backend container parle bien a Neon

## Phase 29 - Git propre

- [x] Faire des commits progressifs
- [x] Retirer `CHECKPOINT.md` du suivi Git
- [x] Ajouter `CHECKPOINT.md` dans `.gitignore`
- [x] Pousser les commits sur `origin/main`
- [ ] Continuer a faire des commits coherents apres chaque grande etape validee

## Phase 30 - GitHub

- [x] Creer le repository GitHub
- [x] Connecter le repo local au repo distant
- [x] Comprendre le lien entre repo local et repo distant
- [x] Pousser le projet sur GitHub

## Phase 31 - GitHub Actions

- [x] Creer le dossier `.github/workflows/`
- [x] Creer le fichier `.github/workflows/ci.yml`
- [x] Creer le squelette du workflow CI avec `name`, `on`, `jobs` et `steps`
- [x] Ajouter `actions/checkout` dans un vrai step
- [x] Ajouter progressivement le setup Python
- [x] Ajouter progressivement le setup Node
- [x] Committer le workflow CI rempli
- [x] Pousser le workflow CI sur GitHub

## Phase 32 - CI backend

- [x] Installer Python dans GitHub Actions
- [x] Installer les dependances backend dans la CI
- [x] Lancer `python manage.py check`
- [x] Lancer les tests Django
- [x] Comprendre le role du fallback SQLite dans la CI
- [x] Verifier que le job backend passe sur GitHub

## Phase 33 - CI frontend

- [x] Installer Node dans GitHub Actions
- [x] Installer les dependances avec `npm ci`
- [x] Lancer `npm run lint`
- [x] Lancer `npm run build`
- [x] Verifier que le job frontend passe sur GitHub

## Phase 34 - GitHub Secrets

- [ ] Comprendre ce qu'est un GitHub Secret
- [ ] Decider si la CI doit utiliser Neon ou SQLite
- [ ] Ajouter `DATABASE_URL` en secret GitHub si necessaire
- [ ] Utiliser le secret dans le workflow sans l'ecrire en clair

## Phase 35 - Docker dans GitHub Actions

- [ ] Ajouter le build Docker backend dans la CI
- [ ] Ajouter le build Docker frontend dans la CI
- [ ] Verifier que les images Docker se construisent sur GitHub Actions

## Phase 36 - Container Registry

- [ ] Comprendre ce qu'est une registry
- [ ] Comprendre image, tag, version et commit SHA
- [ ] Choisir une registry, probablement GitHub Container Registry
- [ ] Configurer l'authentification vers la registry
- [ ] Publier l'image backend
- [ ] Publier l'image frontend

## Phase 37 - Kubernetes

- [ ] Creer le dossier `kubernetes/`
- [ ] Ne pas deployer PostgreSQL dans Kubernetes
- [ ] Comprendre l'architecture frontend -> backend -> Neon

## Phase 38 - Premier manifest Kubernetes

- [ ] Creer `kubernetes/backend-deployment.yaml`
- [ ] Comprendre `apiVersion`
- [ ] Comprendre `kind`
- [ ] Comprendre `metadata`
- [ ] Comprendre `spec`
- [ ] Configurer l'image backend
- [ ] Configurer les variables d'environnement du backend

## Phase 39 - Deployment backend Kubernetes

- [ ] Lancer `kubectl apply`
- [ ] Comprendre `kubectl get pods`
- [ ] Comprendre `kubectl get deployments`
- [ ] Comprendre `kubectl logs`
- [ ] Comprendre `kubectl describe`
- [ ] Verifier que le Pod backend fonctionne

## Phase 40 - Service backend Kubernetes

- [ ] Creer le Service backend
- [ ] Comprendre pourquoi un Pod seul ne suffit pas
- [ ] Verifier que le backend est accessible via le Service

## Phase 41 - Secrets Kubernetes

- [ ] Creer un Kubernetes Secret pour Neon
- [ ] Ne pas mettre les credentials Neon dans un YAML versionne
- [ ] Injecter le Secret dans le Deployment backend
- [ ] Verifier que Django se connecte a Neon depuis Kubernetes

## Phase 42 - Frontend Kubernetes

- [ ] Creer `kubernetes/frontend-deployment.yaml`
- [ ] Creer `kubernetes/frontend-service.yaml`
- [ ] Configurer le frontend pour joindre le backend
- [ ] Verifier que le frontend fonctionne dans Kubernetes

## Phase 43 - Architecture Kubernetes finale

- [ ] Valider le chemin Internet -> Frontend Service -> React Pods
- [ ] Valider le chemin React Pods -> Backend Service -> Django Pods
- [ ] Valider le chemin Django Pods -> Neon PostgreSQL
- [ ] Documenter l'architecture finale

## Phase 44 - CI/CD final

- [ ] Lancer les tests backend automatiquement
- [ ] Lancer les checks frontend automatiquement
- [ ] Construire les images Docker automatiquement
- [ ] Publier les images dans la registry
- [ ] Deployer vers Kubernetes
- [ ] Verifier l'application finale apres deploiement

## Phase 45 - Documentation finale

- [ ] Creer ou completer `README.md`
- [ ] Documenter l'installation locale
- [ ] Documenter les variables d'environnement
- [ ] Documenter les commandes backend
- [ ] Documenter les commandes frontend
- [ ] Documenter Docker Compose
- [ ] Documenter la CI
- [ ] Documenter Kubernetes

## Phase bonus - Helm

- [ ] Comprendre pourquoi Helm existe pendant la creation du chart
- [ ] Installer Helm
- [ ] Creer un chart Helm pour l'application
- [ ] Deplacer progressivement les manifests Kubernetes dans les templates Helm
- [ ] Creer et utiliser `values.yaml`
- [ ] Deployer l'application avec `helm install`
- [ ] Mettre a jour l'application avec `helm upgrade`
- [ ] Verifier que le backend, le frontend et Neon fonctionnent encore apres deploiement Helm

## Prochaine etape immediate

- [ ] Ajouter le build Docker backend dans GitHub Actions
- [ ] Ajouter le build Docker frontend dans GitHub Actions
- [ ] Verifier que les images Docker se construisent sur GitHub Actions
