
## API Reference

L'API rest vous permettra de répondre à la majorité des besoins dont vous avez besoins 

Faire suivre   ```http://localhost:3000 ``` 

par ce qui va apparaitre dans les cases grisées en fonction de votre besoin 


<details>
<summary> <h1> Professeurs </h1> </summary>
<br>

### récupérer tous les professeurs
> 📝 les professeurs ici sont l'ensemble des encadrants et des tuteurs

```http
  GET /api/professeurs
```

  <details>
  <summary> Exemple </summary>
  <br>

 -  #### Response

```
        {
            "id": 50,
            "nom": "aa",
            "prenom": "bb",
            "email": "aa@bb.fr",
            "numero_tel": "92830982390",
            "metier": "prof",
            "etablissement": "polytech",
            "role": "Encadrant",
            "nb_eleve_tuteur": 0,
            "password": "$2b$10$BRtzEE1.SAPk5i3AVFIl8OiWJ0iUB.NayJnhWJMlhibzv09/7kmAu",
            "createdAt": "2023-07-06T11:42:17.000Z",
            "updatedAt": "2023-07-06T11:42:17.000Z"
        },
        {
            "id": 51,
            "nom": "cc",
            "prenom": "dd",
            "email": "cc@dd.fr",
            "numero_tel": "92830982390",
            "metier": "prof",
            "etablissement": "polytech",
            "role": "Tuteur",
            "nb_eleve_tuteur": 2,
            "password": "$2b$10$TYtSdwAx9adQwe90q3yaHOa25uJ7fxBGVYUzWivnokg9QugK2/1oi",
            "createdAt": "2023-07-06T11:42:17.000Z",
            "updatedAt": "2023-07-06T11:42:17.000Z"
        }

```
  </details>

### récupérer un professeur
> 

```http
  GET /api/professeurs/{id}
```
> ne pas intégrer les "{}" dans votre requête 


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id du professeur à trouver |


<details>
  <summary> Exemple</summary>
  <br>

  - #### Request

  ```http
    GET /api/professeur/50
  ``` 
  - #### Response

          {
            "id": 50,
            "nom": "aa",
            "prenom": "bb",
            "email": "aa@bb.fr",
            "numero_tel": "92830982390",
            "metier": "prof",
            "etablissement": "polytech",
            "role": "Encadrant",
            "nb_eleve_tuteur": 0,
            "password": "$2b$10$BRtzEE1.SAPk5i3AVFIl8OiWJ0iUB.NayJnhWJMlhibzv09/7kmAu",
            "createdAt": "2023-07-06T11:42:17.000Z",
            "updatedAt": "2023-07-06T11:42:17.000Z"
        },

</details>

### récupérer tous les professeurs en fonction de leur rôle

```http
  GET /api/professeurs/role/{role}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `role`      | `Tuteur`, `Encadrant` | **Required**. role du professeur|

> 📝 les professeurs qui sont à la foi encadrant et tuteur seront retourné par défaut 

<details>
<summary>Exemple </summary>
<br>

- #### Request
```http
  GET /api/professeurs/role/Tuteur
```

- #### Response 

```
    {
        "id": 51,
        "nom": "cc",
        "prenom": "dd",
        "email": "cc@dd.fr",
        "numero_tel": "92830982390",
        "metier": "prof",
        "etablissement": "polytech",
        "role": "Tuteur",
        "nb_eleve_tuteur": 2,
        "password": "$2b$10$TYtSdwAx9adQwe90q3yaHOa25uJ7fxBGVYUzWivnokg9QugK2/1oi",
        "createdAt": "2023-07-06T11:42:17.000Z",
        "updatedAt": "2023-07-06T11:42:17.000Z"
    },
    {
        "id": 52,
        "nom": "ee",
        "prenom": "ff",
        "email": "ee@ff.fr",
        "numero_tel": "92830982390",
        "metier": "prof",
        "etablissement": "polytech",
        "role": "Encadrant et Tuteur",
        "nb_eleve_tuteur": 1,
        "password": "$2b$10$h79Ffg0MxlHUZMJ2P2zt0OR8kf2i0BLM/cwVBoX8VIW1DYmUW9ZKW",
        "createdAt": "2023-07-06T11:42:17.000Z",
        "updatedAt": "2023-07-06T11:42:17.000Z"
    },
```
</details>

### récupérer tous les élèves en fonctions de leur tuteur

```http
  GET /api/professeurs/tuteur/{tuteurID}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `tuteurId`| `int` | **Required**. identifiant du tuteur|

> 📝 les les professeurs qui ne sont pas tuteur, auront aucune réponse à cette requête

<details>
<summary>Exemple </summary>
<br>

- #### Request
```http
  GET /api/professeurs/tuteur/51
```

- #### Response 

La liste des élèves dont le professeur est tuteur
```
    {
        "id": 54,
        "nom": "a",
        "prenom": "b",
        "email": "a@b.fr",
        "numero_tel": "987654321",
        "numero_tel_parent": "1234567890",
        "adress": "montpellier",
        "etablissement": "college",
        "password": null,
        "professeurId": 51,
        "parcoursId": 552,
        "createdAt": "2023-07-06T11:41:08.000Z",
        "updatedAt": "2023-07-07T09:07:27.000Z"
    },
    {
        "id": 55,
        "nom": "c",
        "prenom": "d",
        "email": "c@d.fr",
        "numero_tel": "987654321",
        "numero_tel_parent": "1234567890",
        "adress": "montpellier",
        "etablissement": "college",
        "password": null,
        "professeurId": 51,
        "parcoursId": 552,
        "createdAt": "2023-07-06T11:41:08.000Z",
        "updatedAt": "2023-07-07T09:07:38.000Z"
    }
```

</details>


### Créer un professeur

```http
  POST /api/professeurs
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nom`| `string` | **Required**. nom du professeur|
| `prenom`| `string` | **Required**. prenom du professeur|
| `email`| `string` | **Required**. email du professeur utile à sa connexion|
| `numero_tel`| `string` | **Required**. numéro de téléphone du professeur|
| `metier`| `string` | **Required**. métier du professeur|
| `etablissement`| `string` | **Required**. établissement dans lequel le professeur exerce|
| `role`| `Tuteur`, `Encadrant`,`Encadrant et Tuteur` | **Required**. role que souhaite avoir le professeur|
| `nb_eleve_tuteur`| `int` | **Required**. nombre d'élèves dont le professeur souhaite être tuteur, 0 si encadrant uniquement|


<details>
<summary>Exemple</summary>
<br>

- #### Request
```http
  POST /api/professeurs
```

```
        {
            "nom": "Jean",
            "prenom": "Marc",
            "email": "jean@marc.fr",
            "numero_tel": "0612345678",
            "metier": "Enseignant Chercheur",
            "etablissement": "Université des sciences de Montpellier",
            "role" : "Encadrant",
            "nb_eleve_tuteur": 0
        }
```

- #### Response 
```
        {
            "id": 61,
            "nom": "Jean",
            "prenom": "Marc",
            "email": "jean@marc.fr",
            "numero_tel": "0612345678",
            "metier": "Enseignant Chercheur",
            "etablissement": "Université des sciences de Montpellier",
            "role": "Encadrant",
            "nb_eleve_tuteur": 0,
            "password": "$2b$10$B8wL2D47NxoVWRBJ18Zk6.Eaqjq6FNEulgMvFWeYM2keBrqTmixie",
            "updatedAt": "2023-07-11T09:02:04.891Z",
            "createdAt": "2023-07-11T09:02:04.891Z"
        }
```

</details>


### Supprimer un professeur

```http
  DELETE /api/professeurs/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id du professeur à supprimer |


<details>
<summary>Exemple</summary>
<br>

- #### Request
```http
  DELETE /api/professeurs/61
```
- #### Response 
```
    { message: 'Le professeur a bien été supprimé.' }
```
</details>

### Supprimer tous les professeurs

```http
  DELETE /api/professeurs
```

<details>
<summary>Exemple</summary>
<br>

- #### Response 
```
    { message: 'Nombre de professeurs supprimés : 14' }
```
</details>

</details>


<details>
<summary> <h1>Eleves</h1> </summary>

### récupérer tous les élèves

```http
  GET /api/eleves
```

  <details>
  <summary> Exemple </summary>
  <br>

 -  #### Response

```
    {
        "id": 54,
        "nom": "a",
        "prenom": "b",
        "email": "a@b.fr",
        "numero_tel": "987654321",
        "numero_tel_parent": "1234567890",
        "adress": "montpellier",
        "etablissement": "college",
        "password": null,
        "professeurId": 51,
        "parcoursId": 552,
        "createdAt": "2023-07-06T11:41:08.000Z",
        "updatedAt": "2023-07-07T09:07:27.000Z"
    },
    {
        "id": 55,
        "nom": "c",
        "prenom": "d",
        "email": "c@d.fr",
        "numero_tel": "987654321",
        "numero_tel_parent": "1234567890",
        "adress": "montpellier",
        "etablissement": "college",
        "password": null,
        "professeurId": 51,
        "parcoursId": 552,
        "createdAt": "2023-07-06T11:41:08.000Z",
        "updatedAt": "2023-07-07T09:07:38.000Z"
    },

```
</details>

### récupérer un élève

```http
  GET /api/eleves/{id}
```
> ne pas intégrer les "{}" dans votre requête 


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id de l'élève à trouver|

<details>
  <summary> Exemple</summary>
  <br>

  - #### Request

  ```http
    GET /api/eleves/54
  ``` 
  - #### Response

```
    {
        "id": 54,
        "nom": "a",
        "prenom": "b",
        "email": "a@b.fr",
        "numero_tel": "987654321",
        "numero_tel_parent": "1234567890",
        "adress": "montpellier",
        "etablissement": "college",
        "password": null,
        "professeurId": 51,
        "parcoursId": 552,
        "createdAt": "2023-07-06T11:41:08.000Z",
        "updatedAt": "2023-07-07T09:07:27.000Z"
    }
```

</details>


### récupérer les membres du groupe d'un élève
> les élèves d'un même groupe ont le même parcours, voir partie sur les Parcours pour plus d'informations

```http
  GET /api/eleves/groupe/{id}
```
> ne pas intégrer les "{}" dans votre requête 


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id de l'élève à trouver|

<details>
  <summary> Exemple</summary>
  <br>

  - #### Request

  ```http
    GET /api/eleves/groupe/54
  ``` 
  - #### Response

```
    {
        "id": 55,
        "nom": "c",
        "prenom": "d",
        "email": "c@d.fr",
        "numero_tel": "987654321",
        "numero_tel_parent": "1234567890",
        "adress": "montpellier",
        "etablissement": "college",
        "password": null,
        "professeurId": 51,
        "parcoursId": 552,
        "createdAt": "2023-07-06T11:41:08.000Z",
        "updatedAt": "2023-07-07T09:07:38.000Z"
    },
    {
        "id": 56,
        "nom": "e",
        "prenom": "f",
        "email": "e@f.fr",
        "numero_tel": "987654321",
        "numero_tel_parent": "1234567890",
        "adress": "montpellier",
        "etablissement": "college",
        "password": null,
        "professeurId": 52,
        "parcoursId": 552,
        "createdAt": "2023-07-06T11:41:08.000Z",
        "updatedAt": "2023-07-07T09:16:56.000Z"
    }
```

</details>


### récupérer les élèves pour une activité donnée et un moment donné


```http
  GET /api/eleves/activite/{activiteId}/{indexMoment}
```
> ne pas intégrer les "{}" dans votre requête 


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `activiteId`      | `int` | **Required**. id d'une activité |
| `indexMoment`      | `int` [0,9]| **Required**. index d'un moment de la semaine : 0 étant lundi matin, 1 lundi aprés-midi...|

<details>
  <summary> Exemple</summary>
  <br>

  - #### Request

  ```http
    GET /api/eleves/activite/48/0
  ``` 
  - #### Response

```
    {
        "id": 57,
        "nom": "g",
        "prenom": "h",
        "email": "g@h.fr",
        "numero_tel": "987654321",
        "numero_tel_parent": "1234567890",
        "adress": "montpellier",
        "etablissement": "college",
        "password": null,
        "professeurId": 53,
        "parcoursId": 552,
        "createdAt": "2023-07-06T11:41:08.000Z",
        "updatedAt": "2023-07-07T09:17:19.000Z"
    },
    {
        "id": 58,
        "nom": "i",
        "prenom": "j",
        "email": "i@j.fr",
        "numero_tel": "987654321",
        "numero_tel_parent": "1234567890",
        "adress": "montpellier",
        "etablissement": "college",
        "password": null,
        "professeurId": 53,
        "parcoursId": 552,
        "createdAt": "2023-07-06T11:41:08.000Z",
        "updatedAt": "2023-07-07T10:14:05.000Z"
    }
```

</details>

### Créer un élève


```http
  POST /api/eleves
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nom`| `string` | **Required**. nom de l'élève|
| `prenom`| `string` | **Required**. prenom de l'élève|
| `email`| `string` | **Required**. email de l'élève utile à sa connexion|
| `numero_tel`| `string` | **Required**. numéro de téléphone de l'élève|
| `numero_tel_parent`| `string` | **Required**. numéro de téléphone d'un responsable légal de l'élève|
| `etablissement`| `string` | **Required**. collège ou étudie l'élève|
| `adresse`| `string` | **Required**. adress de l'élève|


<details>
  <summary> Exemple</summary>
  <br>

  - #### Request

  ```http
    POST /api/eleves
  ```

```
        {
        "nom": "John",
        "prenom": "Doe",
        "email": "john.doe@example.com",
        "numero_tel": "1234567890",
        "numero_tel_parent": "0987654321",
        "adress": "123 Street",
        "etablissement": "School XYZ"
        }

```

  - #### Response

```
    {
        "id": 67,
        "nom": "John",
        "prenom": "Doe",
        "email": "john.doe@example.com",
        "numero_tel": "1234567890",
        "numero_tel_parent": "0987654321",
        "adress": "123 Street",
        "etablissement": "School XYZ",
        "updatedAt": "2023-07-11T10:36:53.196Z",
        "createdAt": "2023-07-11T10:36:53.196Z"
    }
```

</details>

### Confirmer un élève
> confirmer un élève revient à lui attribuer un tuteur disponible


```http
  PUT /api/eleves/confirmation/{id}
```
> ne pas intégrer les "{}" dans votre requête 


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id de l'élève à confirmer|


<details>
  <summary> Exemple</summary>
  <br>

  - #### Request

  ```http
    PUT /api/eleves/confirmation/67
  ```

  - #### Response

```
    
    {
        "id": 67,
        "nom": "John",
        "prenom": "Doe",
        "email": "john.doe@example.com",
        "numero_tel": "1234567890",
        "numero_tel_parent": "0987654321",
        "adress": "123 Street",
        "etablissement": "School XYZ",
        "password": null,
        "professeurId": 55,
        "parcoursId": null,
        "createdAt": "2023-07-11T10:36:53.000Z",
        "updatedAt": "2023-07-11T10:43:53.953Z"
    }
        
```
> ainsi professeurId n'est plus null, il a donc un tuteur

</details>


### Attribuer un parcours à un élève
> attribution d'un parcours à l'élève s'il y en a de disponible

```http
  PUT /api/eleves/parcours/{id}
```
> ne pas intégrer les "{}" dans votre requête 


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id de l'élève à qui on veut attribuer un parcours|


<details>
  <summary> Exemple</summary>
  <br>

  - #### Request

  ```http
    PUT /api/eleves/parcours/67
  ```

  - #### Response

```
    {
        "id": 67,
        "nom": "John",
        "prenom": "Doe",
        "email": "john.doe@example.com",
        "numero_tel": "1234567890",
        "numero_tel_parent": "0987654321",
        "adress": "123 Street",
        "etablissement": "School XYZ",
        "password": null,
        "professeurId": 55,
        "parcoursId": 552,
        "createdAt": "2023-07-11T10:36:53.000Z",
        "updatedAt": "2023-07-11T11:04:51.622Z"
    }   
```
> ainsi parcoursId n'est plus null, il a donc un parcours


</details>

### Supprimer un élève

```http
  DELETE /api/eleves/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id de l'élève à supprimer |


<details>
<summary>Exemple</summary>
<br>

- #### Request
```http
  DELETE /api/eleves/67
```
- #### Response 
```
    { message: "L'élève a bien été supprimé."" }
```
</details>


### Supprimer tous les élèves

```http
  DELETE /api/eleves   
```

<details>
<summary>Exemple</summary>
<br>

- #### Response 
```
    { message: "Nombre d'élèves supprimés : 18" }
```
</details>

</details>

<details>
<summary> <h1> Activités </h1> </summary>
<br>

### récupérer toutes les activités

```http
  GET /api/activites
```

  <details>
  <summary> Exemple </summary>
  <br>

 -  #### Response

```
    {
        "id": 48,
        "nom": "act2",
        "description": "une deuxieme activitié",
        "nb_realisations": 1,
        "nb_eleve_max": 16,
        "l1": 1,
        "l2": 1,
        "ma1": 0,
        "ma2": 0,
        "me1": 0,
        "me2": 0,
        "j1": 1,
        "j2": 0,
        "v1": 1,
        "v2": 0,
        "professeurId": 50,
        "createdAt": "2023-07-06T11:42:17.000Z",
        "updatedAt": "2023-07-06T11:42:17.000Z"
    },
    {
        "id": 49,
        "nom": "act5",
        "description": "une cinquième activité",
        "nb_realisations": 3,
        "nb_eleve_max": 7,
        "l1": 0,
        "l2": 0,
        "ma1": 1,
        "ma2": 0,
        "me1": 1,
        "me2": 1,
        "j1": 1,
        "j2": 1,
        "v1": 1,
        "v2": 1,
        "professeurId": 54,
        "createdAt": "2023-07-06T11:42:17.000Z",
        "updatedAt": "2023-07-06T11:42:17.000Z"
    }

```
  </details>

### récupérer une activite 

```http
  GET /api/activites/{id}
```
> ne pas intégrer les "{}" dans votre requête 


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id de l'activité à trouver |


<details>
  <summary>Exemple</summary>
  <br>

  - #### Request

  ```http
    GET /api/activites/48
  ``` 
  - #### Response
```
    {
        "id": 48,
        "nom": "act2",
        "description": "une deuxieme activitié",
        "nb_realisations": 1,
        "nb_eleve_max": 16,
        "l1": 1,
        "l2": 1,
        "ma1": 0,
        "ma2": 0,
        "me1": 0,
        "me2": 0,
        "j1": 1,
        "j2": 0,
        "v1": 1,
        "v2": 0,
        "professeurId": 50,
        "createdAt": "2023-07-06T11:42:17.000Z",
        "updatedAt": "2023-07-06T11:42:17.000Z"
    }
```
</details>

### Créer une activité

```http
  POST /api/activites
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nom`| `string` | **Required**. nom de l'activité|
| `description`| `string` | **Required**. déscription du déroulement de l'activité|
| `nb_realisations`| `int` | **Required**. nombre de fois que l'encadrant peut réaliser l'activité dans la semaine|
| `nb_eleve_max`| `int` | **Required**. nombre d'élèves que peut accepter au maximum l'encadrant durant l'activité|
| `l1`, `l2`, `ma1`, `ma2`, `me1`, `me2`, `j1`, `j2`, `v1`, `v2`| `0`, `1` | **Required**. disponibilité de l'activité à ce moment : 1 disponible, 0 pas disponible|
| `professeurId`| `int` | **Required**. **clé étrangère ref : professeur** l'identifiant de l'encadrant de l'activité|
| `lieu`| `string` | **Required** le lieu du déroulement de l'activité|
| `lieu_rdv`| `string` | **Required**. lieu où doivent se rendre les stagiaires pour rencontrer leur encadrant|


<details>
<summary>Exemple</summary>
<br>

- #### Request
```http
  POST /api/activites
```

```
    {
        "nom": "Arduino",
        "description": "une activitié pour faire quelques jeu avec une arduino",
        "nb_realisations": 1,
        "nb_eleve_max": 14,
        "l1": 0,
        "l2": 0,
        "ma1":1,
        "ma2": 1,
        "me1": 0,
        "me2": 0,
        "j1": 1,
        "j2": 0,
        "v1": 1,
        "v2": 0,
        "professeurId": 52,
    }
```

- #### Response 
```
    {
        "message": "Activité créée avec succès",
        "activite": {
            "id": 57,
            "nom": "Arduino",
            "description": "une activitié pour faire quelques jeu avec une arduino",
            "nb_realisations": 1,
            "nb_eleve_max": 14,
            "l1": 0,
            "l2": 0,
            "ma1": 1,
            "ma2": 1,
            "me1": 0,
            "me2": 0,
            "j1": 1,
            "j2": 0,
            "v1": 1,
            "v2": 0,
            "professeurId": 52,
            "updatedAt": "2023-07-12T08:41:37.779Z",
            "createdAt": "2023-07-12T08:41:37.779Z"
        }
    }
```

</details>

### Modifier une activité

```http
  PUT /api/activites
```

| Parameters | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`| `int` |**Required**. Identifiant de l'activité à modifier|


| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nom`| `string` |nom de l'activité|
| `description`| `string` | déscription du déroulement de l'activité|
| `nb_realisations`| `int` | nombre de fois que l'encadrant peut réaliser l'activité dans la semaine|
| `nb_eleve_max`| `int` |  nombre d'élèves que peut accepter au maximum l'encadrant durant l'activité|
| `l1`, `l2`, `ma1`, `ma2`, `me1`, `me2`, `j1`, `j2`, `v1`, `v2`| `0`, `1` | disponibilité de l'activité à ce moment : 1 disponible, 0 pas disponible|
| `professeurId`| `int` | **clé étrangère ref : professeur** l'identifiant de l'encadrant de l'activité|
| `lieu`| `string` | le lieu du déroulement de l'activité|
| `lieu_rdv`| `string` |. lieu où doivent se rendre les stagiaires pour rencontrer leur encadrant|




<details>
<summary>Exemple</summary>
<br>

- #### Request
```http
  PUT /api/activites/129
```

```
    {
        "nom": "Activite 10",
        "descriptions": "finalement c'est l'activité 10",
        "lieu": "Place Eugène bataillon",
        "lieu_rdv": "à l'entrée de la fac devant le grand batiment blanc"
    }
```

- #### Response 
```
    {
        "message": "Activité modifiée avec succès",
        "activite": {
            "id": 129,
            "nom": "Activite 10",
            "description": "description",
            "nb_realisations": 2,
            "nb_eleve_max": 6,
            "l1": 0,
            "l2": 0,
            "ma1": 1,
            "ma2": 0,
            "me1": 0,
            "me2": 1,
            "j1": 0,
            "j2": 1,
            "v1": 0,
            "v2": 0,
            "lieu": "Place Eugène bataillon",
            "lieu_rdv": "à l'entrée de la fac devant le grand batiment blanc",
            "professeurId": 77,
            "createdAt": "2023-08-02T06:10:11.000Z",
            "updatedAt": "2023-08-03T06:16:28.253Z"
        }
    }
```

</details>

### Supprimer une activité

```http
  DELETE /api/activité/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id de l'activité à supprimer |


<details>
<summary>Exemple</summary>
<br>

- #### Request
```http
  DELETE /api/activites/57
```
- #### Response 
```
    { message: 'Activité supprimée avec succès' }
```
</details>

### Supprimer toutes les activités

```http
  DELETE /api/activites
```

<details>
<summary>Exemple</summary>
<br>

- #### Response 
```
    { message: 'Toutes les activités ont été supprimées' }
```
</details>

</details>

<details>
<summary> <h1> Parcours </h1> </summary>
<br>

### Générer des parcours

```http
  POST /api/parcours
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nbParcours`      | `int` | **Required**. nombre de parcours à générer |
| `nbEleveMax` | `int` | **Required**. nombre d'élève par groupe et donc par parcours |

  <details>
  <summary> Exemple </summary>
  <br>

 -  #### Request

```
    {
        "nbParcours": 2,
        "nbEleveMax": 7
    }

```

 -  #### Response

```
    {
        "message": "Génération des emplois du temps a été un succés"
    }

```
  </details>

</details>

<details>
<summary> <h1> ActiviteParcours </h1> </summary>
<br>

### récupérer toutes les association activité-parcours-indexMoment
> 📝 les indexMoment correspondent au moment où se déroule l'activité durant la semaine : 0 = lundi matin, 1 = lundi après-midi...

```http
  GET /api/activiteparcours
```

  <details>
  <summary> Exemple </summary>
  <br>

 -  #### Response

```
    {
        "parcoursId": 554,
        "activiteId": 48,
        "indexMoment": 0,
        "createdAt": "2023-07-12T10:37:41.000Z",
        "updatedAt": "2023-07-12T10:37:41.000Z"
    },
    {
        "parcoursId": 554,
        "activiteId": 49,
        "indexMoment": 2,
        "createdAt": "2023-07-12T10:37:41.000Z",
        "updatedAt": "2023-07-12T10:37:41.000Z"
    },
    {
        "parcoursId": 554,
        "activiteId": 50,
        "indexMoment": 6,
        "createdAt": "2023-07-12T10:37:41.000Z",
        "updatedAt": "2023-07-12T10:37:41.000Z"
    }

```
  </details>

### Récupérer toutes les activités pour chaque parcours

```http
  GET /api/activiteparcours/parcours
```

<details>
  <summary>Exemple</summary>
  <br>

  - #### Response
```
    "555": [
        {
            "parcoursId": 555,
            "activiteId": 48,
            "indexMoment": 0,
            "createdAt": "2023-07-12T10:37:41.000Z",
            "updatedAt": "2023-07-12T10:37:41.000Z"
        },
        {
            "parcoursId": 555,
            "activiteId": 57,
            "indexMoment": 2,
            "createdAt": "2023-07-12T10:37:41.000Z",
            "updatedAt": "2023-07-12T10:37:41.000Z"
        },
        {
            "parcoursId": 555,
            "activiteId": 49,
            "indexMoment": 4,
            "createdAt": "2023-07-12T10:37:41.000Z",
            "updatedAt": "2023-07-12T10:37:41.000Z"
        },
        {
            "parcoursId": 555,
            "activiteId": 50,
            "indexMoment": 6,
            "createdAt": "2023-07-12T10:37:41.000Z",
            "updatedAt": "2023-07-12T10:37:41.000Z"
        },
        {
            "parcoursId": 555,
            "activiteId": 52,
            "indexMoment": 9,
            "createdAt": "2023-07-12T10:37:41.000Z",
            "updatedAt": "2023-07-12T10:37:41.000Z"
        }
    ]
```
</details>

### Récupérer toutes les activités d'un parcours

```http
  GET /api/activiteparcours/{parcoursId}
```
> ne pas intégrer les "{}" dans votre requête 


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `parcoursId`      | `int` | **Required**. Id du parcours dont on veut récupérer les activités|


<details>
  <summary>Exemple</summary>
  <br>

  - #### Request 

```http
  GET /api/activiteparcours/555
```

  - #### Response
```
    "555": [
        {
            "parcoursId": 555,
            "activiteId": 48,
            "indexMoment": 0,
            "createdAt": "2023-07-12T10:37:41.000Z",
            "updatedAt": "2023-07-12T10:37:41.000Z"
        },
        {
            "parcoursId": 555,
            "activiteId": 57,
            "indexMoment": 2,
            "createdAt": "2023-07-12T10:37:41.000Z",
            "updatedAt": "2023-07-12T10:37:41.000Z"
        },
        {
            "parcoursId": 555,
            "activiteId": 49,
            "indexMoment": 4,
            "createdAt": "2023-07-12T10:37:41.000Z",
            "updatedAt": "2023-07-12T10:37:41.000Z"
        },
        {
            "parcoursId": 555,
            "activiteId": 50,
            "indexMoment": 6,
            "createdAt": "2023-07-12T10:37:41.000Z",
            "updatedAt": "2023-07-12T10:37:41.000Z"
        },
        {
            "parcoursId": 555,
            "activiteId": 52,
            "indexMoment": 9,
            "createdAt": "2023-07-12T10:37:41.000Z",
            "updatedAt": "2023-07-12T10:37:41.000Z"
        }
    ]
```
</details>


### Récupérer les activités d'un élève
 > à utiliser uniquement lorsqu'on a attribué un parcours à l'élève en question

```http
  GET /api/activiteparcours/eleve/{eleveId}
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `eleveId`| `int` | **Required**. identifiant de l'élève dont on veut récupérer le parcours et les activités |


<details>
<summary>Exemple</summary>
<br>

- #### Request
```http
  GET /api/activiteparcours/eleve/54
```

- #### Response

```
[
    {
        "parcoursId": 554,
        "activiteId": 48,
        "indexMoment": 0,
        "createdAt": "2023-07-12T10:37:41.000Z",
        "updatedAt": "2023-07-12T10:37:41.000Z"
    },
    {
        "parcoursId": 554,
        "activiteId": 51,
        "indexMoment": 1,
        "createdAt": "2023-07-12T10:37:41.000Z",
        "updatedAt": "2023-07-12T10:37:41.000Z"
    },
    {
        "parcoursId": 554,
        "activiteId": 49,
        "indexMoment": 2,
        "createdAt": "2023-07-12T10:37:41.000Z",
        "updatedAt": "2023-07-12T10:37:41.000Z"
    },
    {
        "parcoursId": 554,
        "activiteId": 53,
        "indexMoment": 3,
        "createdAt": "2023-07-12T10:37:41.000Z",
        "updatedAt": "2023-07-12T10:37:41.000Z"
    },
    {
        "parcoursId": 554,
        "activiteId": 55,
        "indexMoment": 4,
        "createdAt": "2023-07-12T10:37:41.000Z",
        "updatedAt": "2023-07-12T10:37:41.000Z"
    },
    {
        "parcoursId": 554,
        "activiteId": 56,
        "indexMoment": 5,
        "createdAt": "2023-07-12T10:37:41.000Z",
        "updatedAt": "2023-07-12T10:37:41.000Z"
    },
    {
        "parcoursId": 554,
        "activiteId": 50,
        "indexMoment": 6,
        "createdAt": "2023-07-12T10:37:41.000Z",
        "updatedAt": "2023-07-12T10:37:41.000Z"
    },
    {
        "parcoursId": 554,
        "activiteId": 52,
        "indexMoment": 8,
        "createdAt": "2023-07-12T10:37:41.000Z",
        "updatedAt": "2023-07-12T10:37:41.000Z"
    },
    {
        "parcoursId": 554,
        "activiteId": 54,
        "indexMoment": 9,
        "createdAt": "2023-07-12T10:37:41.000Z",
        "updatedAt": "2023-07-12T10:37:41.000Z"
    }
]
```

</details>

### Récupérer le parcours d'un professeur

```http
  GET /api/activiteparcours/professeur/{profId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `profId`      | `int` | **Required**. Id de l'encadrant dont on veut récupérer le parcours |


<details>
<summary>Exemple</summary>
<br>

- #### Request
```http
  GET /api/activiteparcours/professeur/50
```
- #### Response 
```
    {
        "0": [
            [
                {
                    "parcoursId": 554,
                    "activiteId": 48,
                    "indexMoment": 0,
                    "createdAt": "2023-07-12T10:37:41.000Z",
                    "updatedAt": "2023-07-12T10:37:41.000Z"
                },
                {
                    "parcoursId": 555,
                    "activiteId": 48,
                    "indexMoment": 0,
                    "createdAt": "2023-07-12T10:37:41.000Z",
                    "updatedAt": "2023-07-12T10:37:41.000Z"
                }
            ]
        ],
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [
            [
                {
                    "parcoursId": 554,
                    "activiteId": 56,
                    "indexMoment": 5,
                    "createdAt": "2023-07-12T10:37:41.000Z",
                    "updatedAt": "2023-07-12T10:37:41.000Z"
                }
            ]
        ],
        "6": [],
        "7": [],
        "8": [],
        "9": [
            [
                {
                    "parcoursId": 554,
                    "activiteId": 54,
                    "indexMoment": 9,
                    "createdAt": "2023-07-12T10:37:41.000Z",
                    "updatedAt": "2023-07-12T10:37:41.000Z"
                }
            ]
        ]
    }
```
</details>

### Ajouter une activité à un parcours particulier à un moment particulier
> il va falloir créer l'activité avant et récupérer son identifiant pour l'utiliser ici 

```http
  POST /api/activiteparcours/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `parcoursId`      | `int` | **Required**. Id du parcours dans lequel on souhaite ajouter l'activité |
| `activiteId`      | `int` | **Required**. id de l'activité qu'on souhaite rajouter dans le parcours |
| `indexMoment`      | `int` | **Required**. idex du moment durant lequel on veut ajouter l'activité |

<details>
<summary>Exemple</summary>
<br>

- #### Request
```
    
    {
        "parcoursId": 554,
        "activiteId": 57,
        "indexMoment": 7
    }

```

- #### Response 

```
    {
        "parcoursId": 554,
        "activiteId": 57,
        "indexMoment": 7,
        "updatedAt": "2023-07-12T12:29:56.250Z",
        "createdAt": "2023-07-12T12:29:56.250Z"
    }
```
</details>

### Ajouter une activité à tous les parcours à un moment particulier
> il va falloir créer l'activité avant et récupérer son identifiant pour l'utiliser ici 

```http
  POST /api/activiteparcours/parcours
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `activiteId`      | `int` | **Required**. id de l'activité qu'on souhaite rajouter dans le parcours |
| `indexMoment`      | `int` | **Required**. idex du moment durant lequel on veut ajouter l'activité |

<details>
<summary>Exemple</summary>
<br>

- #### Request
```
    
    {
        "activiteId": 57,
        "indexMoment": 7
    }

```

- #### Response 

```
  {
    "message": "L'activité à été ajoutée à tous les parcours avec succés"
  }
```
</details>

</details>

<details>
<summary> <h1> Questions </h1> </summary>
<br>

### récupérer toutes les questions

```http
  GET /api/questions
```

  <details>
  <summary> Exemple </summary>
  <br>

 -  #### Response

```
    [
        {
            "id": 1,
            "contenu": "Comment jugeriez vous la ponctualité de l'élève ?",
            "questionnaire": "Encadrant",
            "createdAt": "2023-06-21T07:08:59.000Z",
            "updatedAt": "2023-06-21T07:08:59.000Z"
        },
        {
            "id": 2,
            "contenu": "Sur 10, comment jugeriez vous la ponctualité de l'élève ?",
            "questionnaire": "Tuteur",
            "createdAt": "2023-06-21T07:09:16.000Z",
            "updatedAt": "2023-06-21T07:31:46.000Z"
        }
    ]

```
  </details>

### récupérer une question 

```http
  GET /api/questions/{id}
```
> ne pas intégrer les "{}" dans votre requête 


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id de la question à trouver |


<details>
  <summary>Exemple</summary>
  <br>

  - #### Request

  ```http
    GET /api/questions/1
  ``` 
  - #### Response
```
    {
        "id": 1,
        "contenu": "Comment jugeriez vous la ponctualité de l'élève ?",
        "questionnaire": "Encadrant",
        "createdAt": "2023-06-21T07:08:59.000Z",
        "updatedAt": "2023-06-21T07:08:59.000Z"
    }
```
</details>

### récupérer les questions d'un questionnaire 

```http
  GET /api/questions/questionnaire/{questionnaire}
```
> ne pas intégrer les "{}" dans votre requête 


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `questionnaire`| `Tuteur`, `Encadrant`, `Eleve` | **Required**. détermine pour qui les questions sont adressées|


<details>
  <summary>Exemple</summary>
  <br>

  - #### Request

  ```http
    GET /api/questions/Tuteur
  ``` 

  - #### Response
```
[
    {
        "id": 2,
        "contenu": "Sur 10, comment jugeriez vous la ponctualité de l'élève ?",
        "questionnaire": "Tuteur",
        "createdAt": "2023-06-21T07:09:16.000Z",
        "updatedAt": "2023-06-21T07:31:46.000Z"
    },
    {
        "id": 6,
        "contenu": "l'élève a été présent à toutes les activités ?",
        "questionnaire": "Tuteur",
        "createdAt": "2023-07-05T12:21:14.000Z",
        "updatedAt": "2023-07-05T12:21:14.000Z"
    }
]
```
</details>

### Créer une question

```http
  POST /api/questions
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `contenu`| `string` | **Required**. l'énoncé de la question|
| `questionnaire`| `Tuteur`, `Encadrant`, `Eleve` | **Required**. détermine pour qui les questions sont adressées|

<details>
<summary>Exemple</summary>
<br>

- #### Request
```http
  POST /api/questions
```

```
    {
        "contenu": "sur 10, à combien jugeriez vous l'autonomie de l'élève",
        "questionnaire": "Encadrant"
    }
```

- #### Response 
```
    {
        "id": 10,
        "contenu": "sur 10, à combien jugeriez vous l'autonomie de l'élève",
        "questionnaire": "Encadrant",
        "updatedAt": "2023-07-12T12:59:32.863Z",
        "createdAt": "2023-07-12T12:59:32.863Z"
    }
```

</details>

### Modifier une question

```http
  PUT /api/questions/{id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`| `int` | **Required**. id de la question à modifier|

<br>



| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `contenu`| `string` | l'énoncé de la question|
| `questionnaire`| `Tuteur`, `Encadrant`, `Eleve` | détermine pour qui les questions sont adressées|

<details>
<summary>Exemple</summary>
<br>

- #### Request
```http
  PUT /api/questions/10
```

```
    {
        "contenu": "trouvez vous l'élève autonome ?"
    }
```

- #### Response 
```
    {
        "id": 10,
        "contenu": "trouvez vous l'élève autonome ?",
        "questionnaire": "Encadrant",
        "createdAt": "2023-07-12T12:59:32.000Z",
        "updatedAt": "2023-07-12T13:19:35.229Z"
    }
```

</details>


### Supprimer une question

```http
  DELETE /api/questions/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id de la question à supprimer |


<details>
<summary>Exemple</summary>
<br>

- #### Request
```http
  DELETE /api/questions/10
```
- #### Response 
```
    {message: "Question supprimée avec succés"}
```
</details>
</details>

<details>
<summary> <h1> Reponses </h1> </summary>
<br>

### récupérer toutes les réponses d'une question

```http
  GET /api/reponses/question/{questionId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `questionId`| `int` | **Required**. Id de la question dont on veut récupérer les réponses |

  <details>
  <summary> Exemple </summary>
  <br>

  - #### Request

  ```http
    GET /api/reponses/question/1
  ```   

 -  #### Response

```
[
    {
        "question": "Comment jugeriez vous la ponctualité de l'élève ?"
    },
    {
        "reponses": [
            {
                "id": 177,
                "contenu": "c'était super ils étaient très assidues",
                "repondantEleveId": null,
                "repondantProfId": 50,
                "eleveConcerneId": null,
                "questionId": 1,
                "activiteId": 48,
                "indexMoment": 0,
                "createdAt": "2023-07-10T06:40:49.000Z",
                "updatedAt": "2023-07-10T06:40:49.000Z"
            }
        ]
    }
]

```
  </details>

  ### récupérer toutes les réponses faite sur un élève

```http
  GET /api/reponses/foreleve/{eleveId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `eleveId`| `int` | **Required**. Id de l'élève sur lequel on veut récupérer les réponses de ses activités

  <details>
  <summary> Exemple </summary>
  <br>

  - #### Request

  ```http
    GET /api/reponses/foreleve/68
  ```   

 -  #### Response

```
[
    {
        "contenu": "Comment jugeriez vous la ponctualité de l'élève ?",
        "reponses": [
            {
                "id": 192,
                "contenu": "élève trés ponctuel super !",
                "repondantEleveId": null,
                "repondantProfId": 62,
                "eleveConcerneId": 68,
                "questionId": 1,
                "activiteId": 117,
                "indexMoment": 0,
                "createdAt": "2023-08-04T09:47:58.000Z",
                "updatedAt": "2023-08-04T09:47:58.000Z"
            }
        ]
    }
]

```
  </details>


  ### récupérer toutes les réponses faites sur une activité
> ce sont donc les réponses du questionnaire encadrant d'un encadrant sur son activité

```http
  GET /api/reponses/activite/{activiteId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `activiteId`| `int` | **Required**. Id de l'activité dont on veut récupérer les réponses

  <details>
  <summary> Exemple </summary>
  <br>

  - #### Request

  ```http
    GET /api/reponses/activite/48
  ```   

 -  #### Response

```
{
    "1": {
        "contenu": "Comment jugeriez vous la ponctualité de l'élève ?",
        "reponses": [
            {
                "id": 177,
                "contenu": "c'était super ils étaient très assidues",
                "repondantEleveId": null,
                "repondantProfId": 50,
                "eleveConcerneId": null,
                "questionId": 1,
                "activiteId": 48,
                "indexMoment": 0,
                "createdAt": "2023-07-10T06:40:49.000Z",
                "updatedAt": "2023-07-10T06:40:49.000Z"
            }
        ]
    }
}

```
  </details>


  ### récupérer toutes les réponses faites par un tuteur sur tous ses élèves

```http
  GET /api/reponses/tuteur/{profId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `profId`| `int` | **Required**. Id du tuteur dont on veut récupérer les réponses

  <details>
  <summary> Exemple </summary>
  <br>

  - #### Request

  ```http
    GET /api/reponses/tuteur/51
  ```   

 -  #### Response
 le première clé correspond à l'identifiant de l'élève, la seconde à l'id de laqiestion

 > ici "54" et "55" sont les identifiants des élèves concerné par les réponses,
 le "2" est l'identifiant de la question 

```
{
    "54": {
        "2": {
            "contenu": "Sur 10, comment jugeriez vous la ponctualité de l'élève ?",
            "reponses": [
                {
                    "id": 178,
                    "contenu": "élève très ponctuel",
                    "repondantEleveId": null,
                    "repondantProfId": 51,
                    "eleveConcerneId": 54,
                    "questionId": 2,
                    "activiteId": null,
                    "indexMoment": null,
                    "createdAt": "2023-07-10T06:43:44.000Z",
                    "updatedAt": "2023-07-10T06:43:44.000Z"
                }
            ]
        }
    },
    "55": {
        "2": {
            "contenu": "Sur 10, comment jugeriez vous la ponctualité de l'élève ?",
            "reponses": [
                {
                    "id": 185,
                    "contenu": "super",
                    "repondantEleveId": null,
                    "repondantProfId": 51,
                    "eleveConcerneId": 55,
                    "questionId": 2,
                    "activiteId": null,
                    "indexMoment": null,
                    "createdAt": "2023-07-13T06:24:05.000Z",
                    "updatedAt": "2023-07-13T06:24:05.000Z"
                }
            ]
        }
    }
}

```
  </details>


  ### récupérer toutes les réponses faites par un encadrant sur toutes ses activités
> ce sont donc les réponses du questionnaire encadrant d'un encadrant sur son activité

```http
  GET /api/reponses/encadrant/{profId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `profId`| `int` | **Required**. Id de l'encadrant dont on veut récupérer les réponses

  <details>
  <summary> Exemple </summary>
  <br>

  - #### Request

  ```http
    GET /api/reponses/encadrant/50
  ```   

 -  #### Response
 Ici le premier indice correspond à l'id l'activité que le prof encadre, ensuite le deuxieme correspond à l'id de la quesiton

 > ici "48" est l'identifiant de l'activité et "1" celui de la question, "54" et "56" sont les activités pour lesquelles il n'y a toujours pas eu de réponse

```
{
    "48": {
        "1": {
            "contenu": "Comment jugeriez vous la ponctualité de l'élève ?",
            "reponses": [
                {
                    "id": 177,
                    "contenu": "c'était super ils étaient très assidues",
                    "repondantEleveId": null,
                    "repondantProfId": 50,
                    "eleveConcerneId": null,
                    "questionId": 1,
                    "activiteId": 48,
                    "indexMoment": 0,
                    "createdAt": "2023-07-10T06:40:49.000Z",
                    "updatedAt": "2023-07-10T06:40:49.000Z"
                }
            ]
        }
    },
    "54": {},
    "56": {}
}

```
  </details>

  ### récupérer toutes les réponses faites par un élève sur le questionnaire de satisfaction élève


```http
  GET /api/reponses/eleve/{eleveId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `eleveId`| `int` | **Required**. Id de l'élève répondant

  <details>
  <summary> Exemple </summary>
  <br>

  - #### Request

  ```http
    GET /api/reponses/eleve/54
  ```   

 -  #### Response
 Ici le premier indice correspond à l'id l'activité que le prof encadre, ensuite le deuxieme correspond à l'id de la quesiton

 > ici "48" est l'identifiant de l'activité et "1" celui de la question

```
{
    "3": {
        "question": "Sur 10, comment jugeriez vous votre semaine à l'UM ? ",
        "reponses": [
            {
                "id": 186,
                "contenu": "10, j'ai adoré !",
                "repondantEleveId": 54,
                "repondantProfId": null,
                "eleveConcerneId": null,
                "questionId": 3,
                "activiteId": null,
                "indexMoment": null,
                "createdAt": "2023-07-13T10:37:23.000Z",
                "updatedAt": "2023-07-13T10:37:23.000Z"
            }
        ]
    },
    "4": {
        "question": "Quelle est la chose que vous avez le plus apprécié faire durant cette semaine ?",
        "reponses": []
    },
    "8": {
        "question": "auriez vous aimé faire autre chose durant cette semaine à l'UM ?",
        "reponses": []
    }
}

```
  </details>


### récupérer une question 

```http
  GET /api/questions/unique
```
> ne pas intégrer les "{}" dans votre requête 


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `repondantEleveId`      | `int` si le répondant est un élève son id|
| `repondantProfId`      | `int` | si le répondant est un prof son id |
| `eleveConcerneId`      | `int` | si le répondant est un tuteur, l'id de l'élève sur lequel il répond|
| `questionId`      | `int` | **Required** Id de la question à laquelle on répond |
| `activiteId`      | `int` | si le répondant est un encadrant, l'id de l'activité sur laquelle il répond|
| `indexMoment`     | `int` | si le répondant est un encadrant, l'index du moment durant lequel se déroule l'activité |


<details>
  <summary>Exemple</summary>
  <br>

  - #### Request 

  ```http
    GET /api/questions/unique
  ``` 

  ```
    {
        "repondantProfId": 50,
        "questionId": 1,
        "activiteId": 48,
        "indexMoment": 0
    }

  ```
  - #### Response
```
{
    "id": 177,
    "contenu": "c'était super ils étaient très assidues",
    "repondantEleveId": null,
    "repondantProfId": 50,
    "eleveConcerneId": null,
    "questionId": 1,
    "activiteId": 48,
    "indexMoment": 0,
    "createdAt": "2023-07-10T06:40:49.000Z",
    "updatedAt": "2023-07-10T06:40:49.000Z"
}
```
</details>

> cette requette est censé retourner une unique réponse en fonction des paramètres qu'on lui passe 
> si le répondant est un encadrant il faut impérativement passer l'activiteId et l'index moment en paramètres
> si le répondant est un tuteur il faut impérativement passer l'eleveConcerneId en paramètres

### Créer une réponse

```http
  POST /api/reponses
```

| body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `contenu`      | `string`  **Required**  le contenu de la réponse|
| `repondantEleveId`      | `int` si le répondant est un élève son id|
| `repondantProfId`      | `int` | si le répondant est un prof son id |
| `eleveConcerneId`      | `int` | si le répondant est un tuteur, l'id de l'élève sur lequel il répond|
| `questionId`      | `int` | **Required** Id de la question à laquelle on répond |
| `activiteId`      | `int` | si le répondant est un encadrant, l'id de l'activité sur laquelle il répond|
| `indexMoment`     | `int` | si le répondant est un encadrant, l'index du moment durant lequel se déroule l'activité |

> si un encadrant a déjà ajouté une réponse sur une activité à un moment donné, il ne peut plus le faire pour la même question

> si un tuteur a déjà ajouté une réponse pour un élève donné il ne peut plus faire pour la même question

<details>
<summary>Exemple</summary>
<br>

- #### Request 1 pour encadrant
```http
  POST /api/réponse
```

```
    {
        "contenu": "ça s'est trés bien déroulé", 
        "repondantProfId": 50,
        "questionId": 1,
        "activiteId": 54,
        "indexMoment": 5
    }
```

- #### Response 1 pour encadrant
```
    {
        "id": 187,
        "contenu": "ça s'est trés bien déroulé",
        "repondantProfId": 50,
        "questionId": 1,
        "activiteId": 54,
        "indexMoment": 5,
        "updatedAt": "2023-07-13T11:46:38.183Z",
        "createdAt": "2023-07-13T11:46:38.183Z"
    }
```

- #### Request 2 pour tuteur
```http
  POST /api/réponse
```

```
    {
        "contenu": "l'activité sur l'eau", 
        "repondantEleveId": 54,
        "questionId": 4

    }
```

- #### Response 2 pour tuteur
```
    {
        "id": 190,
        "contenu": "l'activité sur l'eau",
        "repondantEleveId": 54,
        "questionId": 4,
        "updatedAt": "2023-07-13T11:59:20.338Z",
        "createdAt": "2023-07-13T11:59:20.338Z"
    }
```

- #### Request 3 pour élève

```http
  POST /api/réponse
```

```
    {
        "contenu": "l'activité sur l'eau", 
        "eleveReppondantId": 54,
        "questionId": 4

    }
```

- #### Response 3 pour élève

```
    {
        "id": 189,
        "contenu": "l'activité sur l'eau",
        "questionId": 4,
        "updatedAt": "2023-07-13T11:56:46.934Z",
        "createdAt": "2023-07-13T11:56:46.934Z"
    }
```

</details>

### Modifier une réponse

```http
  PUT /api/reponses/{id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`| `int` | **Required**. id de la réponse à modifier|

<br>



| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `contenu`| `string` | **Required** l'énoncé de la question|

<details>
<summary>Exemple</summary>
<br>

- #### Request
```http
  PUT /api/reponses/190
```

```
    {
        "contenu": "l'activité sur l'ordinateur"
    }
```

- #### Response 
```
    {
        "id": 190,
        "contenu": "l'activité sur l'ordinateur",
        "repondantEleveId": 54,
        "repondantProfId": null,
        "eleveConcerneId": null,
        "questionId": 4,
        "activiteId": null,
        "indexMoment": null,
        "createdAt": "2023-07-13T11:59:20.000Z",
        "updatedAt": "2023-07-13T12:06:59.757Z"
    }
```

</details>


### Supprimer une réponse

```http
  DELETE /api/reponses/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id de la réponse à supprimer |


<details>
<summary>Exemple</summary>
<br>

- #### Request

```http
  DELETE /api/reponses/190
```
- #### Response 

```
    {message: "Réponse supprimé avec succés"}
```
</details>

### Supprimer toutes les réponses

```http
  DELETE /api/reponses
```
<details>
<summary>Exemple</summary>
<br>

- #### Response 

```
    {message: "Les réponses ont été supprimées avec succés"}

```
</details>


</details>

