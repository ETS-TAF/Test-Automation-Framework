# Guide de contribution pour TAF

## Processus de contribution

La contribution au projet pour les équipes se fait de manière suivante :
 - Réalisez une fork du projet à partir de la branche `main`
 - Travaillez en équipe sur cette fork
   - Voir [la partie "GIT Flow" dans le fichier CONVENTIONS.md](./documentation/CONVENTIONS.md#git-flow) pour les bonnes pratiques à utiliser dans le cadre de votre travail sur votre fork.
 - Lorsque vous estimez que votre fork est prête à être intégré dans l'application en production, vous pouvez faire une "merge request".
   - Pour que votre fork soit prête à être intégrée, il faut que celle-ci démontre une nouvelle fonctionnalité majeure, testée et fonctionnant comme attendue.
   - Votre merge request doit contenir un texte expliquant la nouvelle fonctionnalité en détail, comment elle est utilisée et testée. Si applicable, des captures d'écrans peuvent être fournies.
 - Votre requête sera ensuite étudiée par les membres AQL de l'équipe 1. Si celle-ci fonctionne et satisfait les mesures d'AQL mises en places, alors elle sera acceptée et intégrée à l'application.
   - Dans le cas contraire, la requête sera refusée et des commentaires seront adressés sur les modifications à apporter.

## Règles à respecter

Voici l'ensemble des règles à respecter lors de votre contribution à TAF. Si celles-ci ne sont pas respectées, **vos merge requests risquent fortement d'être refusées.**

- Les conventions spécifiées dans le fichier [CONVENTIONS.md](./documentation/CONVENTIONS.md) concernant le code et la réalisation de celui ci doivent être respectées.
- Le code réalisé doit être
  - Accompagné d'une documentation disponible sur le [Wiki.js](https://js.wiki/) du projet.
  - Testé. Bien que nous ne demandons pas un % de couverture fixe, un maximum des fonctions réalisées doivent être couverte par des tests unitaires.