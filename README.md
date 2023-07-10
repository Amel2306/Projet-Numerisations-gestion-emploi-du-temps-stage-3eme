# Une semaine à l'UM !

Cette application a pour objectif de numériser la gestion stage de 3eme effectué au sein de l'Université de Montepllier.

## Les utilisateurs 

Les utilisateurs seront classés selon leur rôle et il y aura au total 4 rôle distincts : 

| Rôle | Description                |
| :-------- |  :------------------------- |
| Encadrant | Encadre une activité |
| Tuteur | Tuteur d'un élève, il responsable de l'élève, reste à disposition de l'élève, répond à ses questions rempli fiche d'évalation finale|
|Élève| l'élève qui effectuera le stage|
|Admin|Administrateur permet de générer les emplois du temps, valider les élèves, générer des questions...|

>> 📝 un utilisateur peut être à la fois encadrant et tuteur

## Les fonctionnalités

Les fonctionnalités sont principalement propre à chaque rôle :

### Encadrant
- Entrer ses informations personnelles pour s'inscrire
- Ajouter une actvité qu'il pourra encadrer 
- Se connecter à son compte
- Accéder aux activités qu'il encadre 
- Accéder à son emploi du temps et le télécharger en PDF
- Accéder à la liste des élèves qu'il aura pour chaque actvité qu'il propose et la télécharger en PDF
- Répondre au questionnaire pour les encadrants pour chaque activité qu'il propose et modifier ses réponses

### Tuteur
- Entrer ses informations personnelles pour s'inscrire
- Entrer le nombre d'élèves dont il souhaite être Tuteur
- Accéder aux informations des élèves dont il est Tuteur
- Accéder à l'emploi du temps de ses élèves 
- Répondre au questionnaire pour tuteur

### Eleve
- Entrer ses informations personnelles pour s'inscrire
- Accèder à ses informations personnelles
- Accéder à son groupe (les personnes ayant le même emploi du temps)
- Accéder a son emploi du temps et le générer en PDF
- Accéder aux infom
- Accéder aux informations de son tuteur
- Accéder au questionnaire de satisfaction pour élève

### Administrateur

- Générer des emplois du temps (Choisi le nombre d'emplois du temps à générer et nombre d'élèves max pour chaque activité)
- Ajouter des activité à la main ou avec un fichier CSV
- Ajouter des Encadrants ou des Tuteurs à la main ou avec un fichier CSV
- Ajouter des élèves à la main ou avec un fichier CSV
- Afficher tous les emplois du temps élève/Tuteur
- Accéder à la liste de tous les élèves, de tous les tuteurs/encadrants
- Supprimer les élèves, les tuteurs, les encadrants
- Valider un élève (lui attribut un tuteur)
- Assigner un emploi du temps à un élève
- Voir les réponses aux questionnaires des élèves, des tuteurs et des encadrants
- Ajouter des questions à n'importe quel questionnaire
- Afficher toutes les questions déjà existante, les modifier, les supprimer

## Lancer l'application en local

- Ouvrir un terminal 

- Clonner le projet 
``` git clone https://github.com/Amel2306/Projet-Numerisations-gestion-emploi-du-temps-stage-3eme.git ```

- Aller dans le fichier du backend 
```cd backend```

- Télécharger les dépendances pour le back
``` npm install ```

- Lancer le serveur 
``` npm start ```

- Revenir au répertoir du projet 
``` cd .. ```

- Aller dans le fichier du frontend
``` cd frontend/stage1 ```

- Télécharger les dépendances du front 
```npm install ```

- Lancer le frontend
```npm start ```
