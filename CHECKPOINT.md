# Checkpoint - Todo App

Derniere mise a jour : 2026-08-20 17:04 CEST

## Mode de travail

- Avancer en petites etapes.
- Une action a la fois.
- Expliquer le code au moment ou il apparait.
- Ne pas construire plusieurs grosses parties d'un coup.
- Mettre ce checkpoint a jour a chaque etape validee.
- L'utilisateur ecrit lui-meme le code et les commandes.
- Codex ne doit pas modifier les fichiers du projet a la place de l'utilisateur.
- Exception autorisee : Codex maintient uniquement `CHECKPOINT.md`.
- A chaque etape, Codex doit relire/verifier le repo pour detecter les erreurs ou incoherences.
- Si Codex voit quelque chose de louche, il doit l'expliquer et proposer une correction ciblee, mais laisser l'utilisateur l'ecrire.

## Etat valide

- Repo Git initialise dans `todo-app/`.
- Backend Django cree dans `backend/`.
- Environnement virtuel cree dans `backend/.venv/`.
- `.gitignore` cree et ignore bien :
  - `backend/.venv/`
  - `backend/db.sqlite3`
  - `backend/.env`
  - `__pycache__/`
  - `*.pyc`
- Django REST Framework installe.
- `rest_framework` ajoute dans `INSTALLED_APPS`.
- App Django `todos` creee.
- App `todos` ajoutee dans `INSTALLED_APPS`.
- Projet Neon cree en region Europe Central / Frankfurt.
- `backend/.env` cree avec `DATABASE_URL=...`.
- `psycopg[binary]` installe.
- `python-dotenv` installe.
- `dj-database-url` installe.
- `backend/config/settings.py` charge `backend/.env` avec `load_dotenv(BASE_DIR / '.env')`.
- `backend/config/settings.py` utilise `DATABASE_URL` via `dj_database_url.parse(os.getenv('DATABASE_URL'))`.
- `python manage.py migrate` a ete lance par l'utilisateur avec succes.
- Les tables Django initiales ont ete creees dans Neon.
- Le modele `Todo` contient le champ `title`.
- Le modele `Todo` contient le champ `description`.
- Le modele `Todo` contient le champ `completed`.
- Le modele `Todo` contient le champ `created_at`.
- Le modele `Todo` contient le champ `updated_at`.
- Le modele `Todo` contient une methode `__str__` qui retourne `self.title`.
- La migration `backend/todos/migrations/0001_initial.py` a ete generee.
- `python manage.py migrate` a applique `todos.0001_initial`.
- La table `todos_todo` a ete creee dans Neon.
- Le modele `Todo` est enregistre dans Django Admin avec `admin.site.register(Todo)`.
- Un superuser Django a ete cree.
- L'admin Django fonctionne sur `/admin/`.
- Une Todo a ete creee depuis Django Admin et enregistree dans Neon.
- Le fichier `backend/todos/serializers.py` a ete cree.
- `TodoSerializer(serializers.ModelSerializer)` existe et s'importe correctement.
- `TodoSerializer.Meta` utilise `model = Todo`.
- `TodoSerializer.Meta.fields` expose `id`, `title`, `description`, `completed`, `created_at`, `updated_at`.
- Choix d'apprentissage valide : utiliser `APIView` pour voir clairement les methodes HTTP.
- `TodoListView(APIView)` existe avec une methode `get`.
- `TodoListView.get` recupere `Todo.objects.all()`, serialize avec `many=True`, puis retourne `Response(serializer.data)`.
- `backend/todos/urls.py` existe.
- `backend/todos/urls.py` declare `path('todos/', TodoListView.as_view(), name='todo-list')`.
- `backend/config/urls.py` inclut `todos.urls` sous le prefixe `api/`.
- L'URL finale du premier endpoint est `/api/todos/`.
- `GET /api/todos/` fonctionne dans le navigateur.
- La Todo creee depuis l'admin apparait dans la reponse API.
- Un test backend pour `GET /api/todos/` existe dans `backend/todos/tests.py`.
- Le test backend `GET /api/todos/` a ete lance par l'utilisateur et passe.
- `POST /api/todos/` a ete ajoute dans `TodoListView.post`.
- `POST` valide `request.data` avec `TodoSerializer`, sauvegarde avec `serializer.save()`, renvoie `201` si OK et `400` si invalide.
- `POST /api/todos/` fonctionne depuis l'interface DRF.
- Une Todo a ete creee depuis l'API et apparait ensuite dans `GET /api/todos/`.
- Un test backend pour `POST /api/todos/` existe.
- Les 2 tests backend `GET liste` et `POST creation` passent.
- `TodoDetailView(APIView)` existe avec une methode `get`.
- `TodoDetailView.get` recupere une Todo par `pk`, renvoie `404` si elle n'existe pas, sinon renvoie la Todo serialisee.
- `backend/todos/urls.py` branche `TodoDetailView` sur `todos/<int:pk>/`.
- L'URL finale du detail est `/api/todos/<id>/`.
- `GET /api/todos/<id>/` fonctionne pour une Todo existante.
- `GET /api/todos/<id>/` renvoie `404` pour un id inexistant.
- Les tests backend pour `GET detail /api/todos/<id>/` existent.
- Les 4 tests backend passent : GET liste, POST creation, GET detail OK, GET detail 404.
- `PATCH /api/todos/<id>/` a ete ajoute dans `TodoDetailView.patch`.
- `PATCH` recupere la Todo existante par `pk`, utilise `request.data` comme donnees entrantes, et `partial=True` pour autoriser une modification partielle.
- `PATCH /api/todos/<id>/` fonctionne manuellement et persiste la modification dans Neon.
- Un test backend pour `PATCH /api/todos/<id>/` existe.
- Les 5 tests backend passent.
- `DELETE /api/todos/<id>/` a ete ajoute dans `TodoDetailView.delete`.
- `DELETE` recupere la Todo par `pk`, renvoie `404` si elle n'existe pas, sinon supprime avec `todo.delete()` et renvoie `204`.
- `DELETE /api/todos/<id>/` fonctionne manuellement.
- Apres suppression, `GET detail` renvoie `404` et la Todo n'apparait plus dans la liste.
- Un test backend pour `DELETE /api/todos/<id>/` existe.
- Les 6 tests backend CRUD passent.
- `backend/requirements.txt` a ete cree avec `pip freeze`.
- Les dependances backend sont figees : Django, DRF, psycopg, python-dotenv, dj-database-url.
- Le dossier `frontend/` a ete cree avec Vite et le template React.
- ESLint a ete choisi comme linter frontend.
- Les dependances frontend ont ete installees avec `npm install`.
- `frontend/node_modules/` existe localement.
- `frontend/package-lock.json` a ete cree.
- Le serveur React Vite demarre avec `npm run dev`.
- L'ecran React par defaut a ete vu dans le navigateur.
- `frontend/src/App.jsx` a ete remplace par un premier composant minimal `Todo App`.
- Le hot reload Vite a mis la page a jour automatiquement.
- `frontend/src/App.css` a ete nettoye avec un style minimal pour `.app`.
- `frontend/src/App.jsx` affiche une liste locale de 3 todos avec `todos.map(...)`.
- Les 3 todos locales sont visibles dans le navigateur.
- La liste locale de todos est stylisee dans `frontend/src/App.css`.
- La liste locale est maintenant stockee dans un state React avec `useState(initialTodos)`.
- `todos` est la valeur actuelle du state, `setTodos` est la fonction qui permettra de modifier ce state.
- Un bouton `Ajouter une Todo` a ete ajoute dans `frontend/src/App.jsx`.
- Le bouton appelle `handleAddTodo` avec `onClick`.
- `handleAddTodo` cree une nouvelle Todo locale puis met a jour le state avec `setTodos([...todos, newTodo])`.
- Le bouton `Ajouter une Todo` est stylise dans `frontend/src/App.css`.
- Le double `;;` dans `background: #fff;;` a ete corrige.
- La suppression locale est ajoutee avec `handleDeleteTodo(id)`.
- Chaque Todo affiche un bouton `Supprimer`.
- La faute `type="boutton"` a ete corrigee en `type="button"`.
- Les boutons `Ajouter une Todo` et `Supprimer` ont des classes CSS separees.
- Les lignes de Todo sont alignees avec flexbox.
- Les todos locales contiennent maintenant un champ `completed`.
- Les nouvelles todos creees localement ont `completed: false`.
- Le statut `completed` est affiche dans la liste avec une condition ternaire.
- `handleToggleTodo(id)` a ete ajoute.
- Chaque Todo a un bouton `Basculer`.
- Le bouton `Basculer` utilise `onClick` pour inverser `completed`.
- Correction faite : `onclick` devait etre `onClick` en JSX.
- Les todos terminees recoivent la classe `completed`.
- Les todos terminees sont affichees avec un texte barre.
- Le state `newTitle` a ete ajoute avec `useState('')`.
- Un input controle a ete ajoute pour saisir le titre d'une nouvelle Todo.
- `value={newTitle}` relie l'input au state React.
- `onChange` met a jour `newTitle` avec la valeur tapee dans l'input.
- `handleAddTodo` utilise maintenant `newTitle.trim()` comme titre de la nouvelle Todo.
- Une protection empeche l'ajout d'une Todo vide ou composee seulement d'espaces.
- Apres ajout valide, `setNewTitle('')` vide l'input.
- L'ajout est maintenant gere avec un formulaire et `onSubmit`.
- `event.preventDefault()` empeche le rechargement de la page lors de l'envoi du formulaire.
- Le bouton d'ajout utilise `type="submit"`.
- Le composant `TodoItem` a ete extrait pour afficher une Todo.
- Le composant `TodoForm` a ete extrait pour afficher le formulaire d'ajout.
- Le composant `TodoList` a ete extrait pour afficher la liste avec `todos.map(...)`.
- Bug corrige : dans `TodoForm`, la prop recue s'appelle maintenant `onNewTitleChange`, comme dans l'appel depuis `App`.
- React a commence la connexion au backend avec `useEffect`.
- `fetch('http://127.0.0.1:8000/api/todos/')` appelle le endpoint Django depuis React.
- Le state `todos` est initialise a `[]` pour etre rempli par les donnees backend.
- `GET http://127.0.0.1:8000/api/todos/` repond bien en `HTTP 200 OK` dans le navigateur Django.
- L'API renvoie au moins une Todo JSON depuis Neon.
- Probleme confirme cote navigateur React : l'appel `fetch` est bloque par CORS.
- Message observe : `No 'Access-Control-Allow-Origin' header is present on the requested resource`.
- `django-cors-headers` a ete installe.
- `corsheaders` a ete ajoute dans `INSTALLED_APPS`.
- `corsheaders.middleware.CorsMiddleware` a ete ajoute en haut de `MIDDLEWARE`.
- `CORS_ALLOWED_ORIGINS` autorise `http://localhost:5173`.
- React arrive maintenant a voir l'API Django depuis le navigateur.
- `backend/requirements.txt` contient maintenant `django-cors-headers==4.9.0`.
- Bootstrap a ete installe cote frontend.
- `bootstrap/dist/css/bootstrap.min.css` est importe dans `frontend/src/main.jsx`.
- Le formulaire React contient maintenant un champ titre et un champ description.
- Le state `newDescription` a ete ajoute avec `useState('')`.
- `TodoForm` recoit `newDescription` et `onNewDescriptionChange` en props.
- Le champ description est un `textarea` controle avec `value={newDescription}`.
- Les champs du formulaire utilisent `form-control`.
- Le bouton d'ajout utilise des classes Bootstrap : `btn btn-primary mt-2`.
- `handleAddTodo` envoie maintenant une requete `POST` vers Django.
- Le `POST` envoie `title`, `description` et `completed` au backend.
- `JSON.stringify` transforme les donnees du formulaire en JSON.
- React utilise la Todo creee et renvoyee par Django pour mettre a jour le state.
- Apres creation, React vide `newTitle` et `newDescription`.
- Les boutons d'action utilisent maintenant Bootstrap :
  - `btn btn-sm btn-outline-success` pour basculer ;
  - `btn btn-sm btn-outline-danger` pour supprimer.
- Les anciennes classes CSS de boutons ont ete retirees du code React et du CSS.
- `bootstrap-icons` a ete installe cote frontend.
- `bootstrap-icons/font/bootstrap-icons.css` est importe dans `frontend/src/main.jsx`.
- Le bouton Ajouter utilise maintenant l'icone `bi-plus-lg`.
- Le bouton Basculer utilise `bi-check-lg` ou `bi-arrow-counterclockwise` selon `completed`.
- Le bouton Supprimer utilise `bi-trash`.
- L'affichage des Todos est passe de `<ul>/<li>` a un tableau Bootstrap.
- `TodoList` utilise `table table-striped table-hover align-middle mt-4 text-start`.
- `TodoItem` retourne maintenant une ligne `<tr>` avec des cellules `<td>`.
- Les colonnes du tableau sont : Titre, Description, Statut, Actions.
- La colonne Actions est alignee a droite avec `text-end text-nowrap`.
- Les anciennes regles CSS ciblees sur `ul` et `li` ont ete supprimees.
- La classe `completed` barre maintenant les cellules du tableau avec `.completed td`.
- `handleToggleTodo` envoie maintenant une requete `PATCH` vers Django.
- Le `PATCH` modifie uniquement le champ `completed`.
- React remplace la Todo locale par la Todo mise a jour renvoyee par Django.
- Bug corrige : `updatedtodo` devait etre `updatedTodo` car JavaScript distingue les majuscules/minuscules.
- Le changement de statut est maintenant persistant apres rechargement.
- `handleDeleteTodo` envoie maintenant une requete `DELETE` vers Django.
- React ne fait pas `response.json()` apres `DELETE`, car Django renvoie `204 No Content`.
- Apres suppression backend, React retire la Todo du state avec `filter`.
- La suppression est maintenant persistante apres rechargement.
- Le state `isLoading` a ete ajoute pour representer le chargement initial.
- Le state `error` a ete ajoute pour stocker un message d'erreur API.
- Le `fetch` initial met `isLoading` a `false` apres succes.
- Le `fetch` initial utilise `.catch` pour afficher une erreur si l'API est inaccessible.
- Un message `Chargement...` s'affiche pendant le chargement.
- Une alerte Bootstrap `alert alert-danger` s'affiche en cas d'erreur API.
- Le rendu conditionnel du `return` gere maintenant les cas chargement, erreur, liste vide et liste remplie.
- Le tableau `TodoList` s'affiche uniquement quand le chargement est termine, qu'il n'y a pas d'erreur, et que `todos.length > 0`.
- Un message `Aucune Todo pour le moment.` s'affiche quand la liste est vide.
- Exception ponctuelle demandee par l'utilisateur : Codex a modifie directement `frontend/src/App.jsx` pour ajouter l'edition d'une Todo.
- Le state `editingTodoId` a ete ajoute pour savoir si le formulaire est en mode ajout ou modification.
- Le bouton crayon `bi-pencil` a ete ajoute dans les actions d'une Todo.
- `handleStartEditTodo(todo)` remplit le formulaire avec le titre et la description de la Todo selectionnee.
- `TodoForm` recoit `isEditing` pour changer l'icone du bouton entre ajout et modification.
- En mode edition, `handleAddTodo` envoie un `PATCH` avec `title` et `description`.
- Apres modification, React remplace la Todo dans le state par la Todo renvoyee par Django.
- Apres modification, le formulaire est vide et `editingTodoId` revient a `null`.
- Test valide :

```bash
backend/.venv/bin/python backend/manage.py check
npm run build
```

Resultat :

```text
System check identified no issues
npm run build passe
```

- Tests manuels valides :
  - ajout avec le bouton ;
  - ajout avec la touche Entree ;
  - blocage des Todos vides ;
  - nettoyage du titre avec `trim()` ;
  - reset de l'input apres ajout ;
  - extraction de `TodoItem` validee ;
  - extraction de `TodoForm` validee ;
  - extraction de `TodoList` validee ;
  - correction du bug d'input validee ;
  - backend Django verifie sur `/api/todos/` avec reponse `200 OK` ;
  - erreur CORS confirmee dans la console navigateur React ;
  - CORS configure dans Django ;
  - `backend/.venv/bin/python backend/manage.py check` passe ;
  - `pip freeze > requirements.txt` a ete relance apres installation de `django-cors-headers` ;
  - `npm run build` passe apres ajout de Bootstrap et du champ description ;
  - `npm run lint` passe ;
  - ajout d'une Todo depuis React valide ;
  - la Todo creee depuis React apparait aussi dans l'API Django ;
  - `npm run build` et `npm run lint` passent apres migration des boutons vers Bootstrap ;
  - tableau Bootstrap avec icones valide visuellement par l'utilisateur ;
  - `npm run build` et `npm run lint` passent apres alignement du tableau ;
  - bouton check/reouvrir valide avec persistance backend ;
  - `npm run build` et `npm run lint` passent apres `PATCH` ;
  - bouton supprimer valide avec persistance backend ;
  - `npm run build`, `npm run lint` et `backend/.venv/bin/python backend/manage.py check` passent apres `DELETE` ;
  - test manuel valide avec backend allume et backend eteint ;
  - `npm run build` et `npm run lint` passent apres ajout de loading/erreur ;
  - rendu conditionnel valide ;
  - `npm run build` et `npm run lint` passent apres gestion de la liste vide ;
  - edition d'une Todo implementee par exception ponctuelle ;
  - `npm run build` et `npm run lint` passent apres ajout de l'edition.

## Etat du code

- `backend/config/settings.py` importe `os`, `dj_database_url` et `load_dotenv`.
- `backend/config/settings.py` utilise Neon/PostgreSQL dans `DATABASES`.
- `backend/todos/models.py` contient :

```python
class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
```

## Prochaine etape

Faire un checkpoint Git propre avant de passer a Docker.

Concepts a expliquer pendant l'etape :

- `git status`
- fichiers suivis/non suivis
- choisir quoi committer
- message de commit coherent

Action exacte pour reprendre :

Depuis la racine `todo-app/`, lancer `git status` et verifier qu'aucun secret ou dossier genere ne part dans le commit.

## Commande de test apres modification

Depuis `frontend/` :

```bash
npm run build
```

Puis tester dans le navigateur :

```text
Ajouter une Todo depuis React et verifier qu'elle apparait aussi dans l'API Django.
```
