Dernière mise à jour : 19/10/2023
---

![Logo taf](./logo_taf.png)

# Test Automation Framework

TAF est un projet de R&amp;D de cadriciel d’automatisation de test


Il permet l'utilisation de plusieurs outils de tests (Selenium, gatling, ...) à travers une interface web unique.

L'application côté serveur est une application Java utilisant Springboot.
L'interface est une application web utilisant le framework Angular.

## Builder et lancer le projet

Pour lancer le projet, la méthode la plus simple est d'utiliser

### Avec docker :

- (Prérequis) Intallez Docker ainsi que Docker Compose sur votre système
- Éxécutez la commande suivante :
```bash
docker compose --env-file .docker_config.env up
```

### Sans docker :

Il est aussi possible de lancer les applications côté serveur et côté client séparement. Cela n'est cependant pas recommandé, car cela est plus complexe, et le deviendra de plus en plus à mesure que de nouveaux services seront ajouté.

**Backend** : 
- Installez maven sur votre système (mvn clean install)
- Configurez l'application Springboot dans votre ide (Eclipse, IntelliJ). Des outils sont disponibles dans ces ide pour lancer l'application.

**Frontend:**
- Intallez des dépendances avec `npm install`
- Lancez l'application avec la ligne de commande
ng serve --o

## Contribuer au projet

La démarche pour contribuer au projet est disponible dans le document [CONTRIBUTING.md](./CONTRIBUTING.md).  
La programmation en JS/TS et Java font usage de conventions précise disponibles dans le fichier [CONVENTIONS.md](./documentation/CONVENTIONS.md).

