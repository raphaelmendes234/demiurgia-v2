# Demiurgia

## Setup

Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

## Guide Git

### Synchroniser la branche avec le main

_À faire régulièrement avant de commencer une session de code pour ne pas accumuler de retard sur le projet._

#### Procédure de mise à jour

1. Se positionner sur sa branche : `git checkout ma-branche`
2. Récupérer l'état du serveur : `git fetch origin`
3. Appliquer les nouveaux commits du main sur la branche : `git rebase origin/main`
4. Mettre à jour la branche distante : `git push origin ma-branche --force-with-lease`

### Merge changements sur main (sans Pull Request)

#### Préparer la branche locale

1. Aller sur la branche : `git checkout ma-branche`
2. Récupérer les dernières mises à jour distantes : `git fetch origin`
3. Mettre à jour avec le main : `git rebase origin/main`
4. Résoudre les conflits (si nécessaire) :
   `git add .`
   `git rebase --continue`
5. Vérifier que tout fonctionne

#### Merge avec le main

6. Passer sur main : `git checkout main`
7. Mettre à jour main local : `git pull origin main`
8. Fusionner la branche : `git merge ma-branche`
9. Envoyer sur le dépôt : `git push origin main`

### Merge changements sur main via une Pull Request

#### Ajouter les changements

1. Aller sur la branche : `git checkout ma-branche`
2. Récupérer les dernières mises à jour : `git fetch origin`
3. Mettre à jour avec le main : `git rebase origin/main`
4. Résoudre les conflits (si nécessaire) :
   `git add .`
   `git rebase --continue`
5. Vérifier que tout fonctionne
6. Push ta branche `git push origin ma-branche --force-with-lease`

#### Créer une Pull Request

7. Sur GitHub, aller dans l'onglet Pull Requests.
8. Cliquer sur New Pull Request.
9. Choisir main comme base et ma-branche pour la comparaison.
10. Une fois la PR revue et validée : Cliquer sur la flèche à côté du bouton Merge et sélectionnez "Rebase and merge".
