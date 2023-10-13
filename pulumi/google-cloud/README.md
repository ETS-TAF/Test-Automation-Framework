# Déploiement Google Cloud avec Pulumi

## Prérequis

- Télécharger NodeJS
- Télécharger Npm (souvent fourni avec NodeJS)
- Lancer la commande `npm install` dans le dossier *pulumi/google-cloud*

### Pulumi

- Télécharger Pulumi en local
- Avoir un compte Pulumi fonctionnel
- Créer un token Pulumi et l'ajouter sur Github Actions dans une variable secret nommée **PULUMI_ACCESS_TOKEN**
- Lancer en local une première fois la commande `pulumi preview` afin de créer la stack (ne surtout pas lancer de commande `pulumi up`)

### Google Cloud

- Créer un compte Google Cloud et activer la facturation
- Créer un nouveau projet ou utiliser le projet de base
- Créer un nouveau compte de service (service account) pour le projet choisi (IAM et Administration > Comptes de service > Créer un compte de service)
    - Spécifier le nom du compte de service (par exmeple Github)
    - Sélectionner les rôles suivants:
        - Administrateur Artifact Registry
        - Administrateur Cloud Run
        - Administrateur d'utilisation du service
        - Administrateur de Cloud SQL
        - Administrateur de compte de service
        - Administrateur de l'organisation
        - Utilisateur du compte de service
- Une fois que le compte de service a été créé, le sélectionner puis aller dans clés puis ajouter une clé et créer une clé. Choisir JSON et télécharger le fichier
- Ajouter le contenu de ce fichier dans Github Actions dans une variable secret nommée **GCP_GITHUB_SA_KEY**

## Modification des variables

Il est nécessaire de modifier certaines variables de Pulumi afin d'adapter le configuration.

Tout d'abord, il faut spécifier l'id du projet google cloud dans deux variables différentes.
- Ouvrir le fichier *Pulumi.dev.yaml* dans le dossier *pulumi/google-cloud*
- Modifier les variables **gcp:project** et **google-cloud:gcp-project** en spécifiant l'id du projet Google Cloud disponible sur la page d'accueil de Google Cloud lorsque le projet est sélectionné

Il faut ensuite spécifier le mot de passe pour la base de données. Choisir un mot de passe robuste ne contenant pas de caractères spéciaux. Modifiant la variable en lançant la commande `pulumi config set db-user-password <mot de passe> --secret` depuis le dossier *pulumi/google-cloud*

## Modification du workflow Github Actions (CI)

Le déploiement est automatisé à chaque push sur la branche *develop*. Afin de déployer le code, il faut faire une petite modification dans le fichier *build-and-deploy.yml* situé dans le dossier *.github/workflows*.
Sous jobs > deploy-wikijs, il y a une step ayant pour id **pulumi** (la dernière). Il faut modifier la valeur de **stack-name** avec le nom de la stack Pulumi. 

## Déploiement

Le déploiement est effectué automatiquement par Github Actions.
Il suffit de faire un commit et un push sur la branche *develop*.

Une fois que le push est réalisé, il est possible de suivre l'avancement en se rendant sur le dépôt GitHub dans l'onglet Actions. Un workflow aura été lancé et il y a un job nommé *deploy-wikijs* dedans.

Il est également possible de suivre le déploiement sur Pulumi en sélectionnant la stack déployée en allant dans l'onglet Activity.

Lorsque le déploiement est terminé, il est possible d'accéder au Wiki en ouvrant un navigateur avec l'adresse fournie sur Google Cloud Run.