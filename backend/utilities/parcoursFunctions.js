const Activite = require ('../models/Activite');
const Parcours = require('../models/Parcours');
const ActiviteParcours = require ("../models/ActiviteParcours");
const Moment = require ('../models/classes/Moment');
const {activiteByMoment, minMom} = require ('./momentFunctions');


//paramètre : nombre de parcours souhaité à indiquer par l'admin
//permet de créer des parcours en récupérant des activtiés pour chaque moment de la semaine si cela est possible
async function associeParcoursActivite(nb_parcours,nb_eleve_max) {
    try {
      // Création des parcours
      var tableau_parcours = [];
      for (let i = 0; i < nb_parcours; i++) {
        const newParcours = await Parcours.create();
        tableau_parcours.push(newParcours);
      }
  
      // Récupère les moments et leurs activités
      const moments_pleins = await activiteByMoment(nb_eleve_max);  
      for (let j = 0; j < moments_pleins.length; j++) {
        for (let j_parcours = 0; j_parcours < tableau_parcours.length; j_parcours++) {
          const parcoursId = tableau_parcours[j_parcours].id;
          const activites = await ActiviteParcours.findAll({
            where: {
              parcoursId: parcoursId,
            }
          });

          //Permet d'avoir toutes les id d'activité d'un parcours
          // utile pour la fonction giveActivite de Moment
          const idActivites = [];
          for (const act of activites) {
            idActivites.push(act.activiteId);
          }
  
          //permet récupération d'une activité pour un moment donné
          const newActParcours = moments_pleins[j].giveActivite(idActivites);
  
          if (newActParcours !== null) {
            // création d'une activite_parcours
              const parcId = tableau_parcours[j_parcours].id
              await ActiviteParcours.create({
                parcoursId: parcId,
                activiteId: newActParcours,
                indexMoment: j
              })
          }
        }
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
      throw new Error("Une erreur s'est produite lors de l'association des parcours aux activités.");
    }
}
module.exports = associeParcoursActivite;