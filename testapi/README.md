# TEST-API

L'application fonctionne comme microservice.

### Port :

Un port est configuré (dans ressources/application.yml) à 8082 par défaut, mais peut être modifié sans incidence sur le programme.
Dans ce cas il faut aussi modifier le port exposer par le dockerfile (`EXPOSE <REPLACE_WITH_YOUR_PORT>`).

## Install & Build :

### On your machine using Maven
*Prerequisites : have maven installed (hence java too)*

Build & install with:
```shell
mvn clean install

Run with:
```
```shell
mvn spring-boot:run
```

### Using Docker

*Prerequisites : Have docker installed*

Build the image with:
```shell
docker build -t taf_testapi .
```

Run the docker container on your localhost at the port 8082:
```shell
docker run -p 127.0.0.1:8082:<REPLACE_WITH_YOUR_PORT> taf_testapi:latest
```

By default the binded port for this application is 8082, hence the command would look like this:
```shell
docker run -p 127.0.0.1:8082:8082 taf_testapi:latest
```

## Launching TAF

Since you'll need TAF to run (since this is only a microservice), you should have a look at running the docker-compose.
The steps are defined in the source directory [README.md](../README.md).
