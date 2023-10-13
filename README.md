# Test-Framework
Projet de R&amp;D de cadriciel (outil) d’automatisation de test


L'application comporte deux modules : backend et frontend

backend est comme son nom l'indique représente la partie serveur, c'est une application springboot
frontend est la partie UI, c'est une application Angular.

## Build et lancement

Backend : build maven (mvn clean install), configurez l'application springboot dans votre ide (Eclipse, IntelliJ).
Des outils sont disponibles dans ces ide pour lancer l'application.

Frontend: lancer l'application avec automatique de la page d'accueil dans une fenêtre du brower, avec la ligne de commande
ng serve --o

Pour le moment, il faut partir chacun des modules séparemment (en premier la backend près le frontend). Une prochaine version
permettera de lancer toute l'application.

## Build and Run using Docker

*Prerequisites : Have Docker and docker-compose installed and running*

Run the following command to start all the dockers using docker-compose by specifying the environment variables file.
```shell
docker compose --env-file .docker_config.env up
```

## Branches

la branche principale de développement est develop, elle sert à faire les merges de toutes les branches de travail en cours.
Chacun, part sa propre branche à partir de la branche develop.
Aucun commit ne doit être fait directement dans la branche develop.
Mohammed Hilali, s'occupe de faire les merges à partir des Pull Request que vous allez adresser à partir de votre branche chacun vers la branche develop.

