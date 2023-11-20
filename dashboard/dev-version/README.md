# Guide d'installation pour le projet TafDashboard

Ce guide vous aidera à mettre en place l'environnement nécessaire pour exécuter l'application TafDashboard sur votre ordinateur portable.

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre ordinateur :

1. [Node.js](https://nodejs.org/) : Téléchargez et installez la dernière version stable.
2. [Git](https://git-scm.com/) : Téléchargez et installez Git si ce n'est pas déjà fait.

## Étapes d'installation

Suivez ces étapes pour configurer l'environnement de développement :

1. Clonez ce dépôt depuis Git en utilisant la commande suivante dans votre terminal :

   ```bash
   git clone https://github.com/AmK-Dev1/TAF-DASHBOARD.git
2. Accédez au répertoire du projet :
   ```bash
   cd {path} to tafdashboard
4. Installer les dépendances du projet en utilisant npm (Node Package Manager). Exécutez la commande suivante :
   ```bash
   npm install @fortawesome/fontawesome-svg-core@^6.4.2 @fortawesome/free-solid-svg-icons@^6.4.2 @fortawesome/react-fontawesome@^0.2.0 apexcharts@^3.44.0 axios@^0.21.1 bootstrap@^5.3.2 chart.js@^4.4.0 jquerry@^0.0.1-security npm@^10.2.3 react@^18.2.0 react-apexcharts@^1.4.1 react-chartjs-2@^5.2.0 react-dom@^18.2.0 react-paginate@^8.2.0 react-router-dom@^5.2.0 react-scripts@^5.0.1 react-table@^7.8.0 reactstrap@^9.2.1
5. Installer Json-server :
   ```bash
   npm install -g json-server
6. Démarrez le serveur JSON en utilisant la commande suivante (--port Optional) :
   ```bash
   json-server --watch db.json --port 3001
8. démarrer l'application React avec la commande :
   ```bash
   npm start

9. Modifier le fichier qui contient l URL de base du json-server (optional):
    ```bash
    tafdashboard/src/server/serverConfig.js 

## Scripts disponibles
Dans le répertoire du projet, vous pouvez également utiliser les scripts npm suivants :

npm start : Lance l'application en mode développement.
npm build : Crée une version de production de l'application.
npm test : Exécute les tests de l'application.
npm eject : Expose la configuration interne de Create React App (utilisez-le avec prudence).

