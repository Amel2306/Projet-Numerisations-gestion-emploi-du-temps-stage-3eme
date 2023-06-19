const Activite = require ('../models/Activite');
const Parcours = require('../models/Parcours');
const ActiviteParcours = require ("../models/ActiviteParcours");
const Moment = require ('../models/classes/Moment');
const {activiteByMoment, minMom} = require ('./momentFunctions');


async function associeParcoursActivite(nb_parcours) {
    try {
      // Création des parcours
      var tableau_parcours = [];
      for (let i = 0; i < nb_parcours; i++) {
        const newParcours = await Parcours.create();
        tableau_parcours.push(newParcours);
      }
  
      // Récupère les moments et leurs activités
      const moments_pleins = await activiteByMoment();  
      for (let j = 0; j < moments_pleins.length; j++) {
        for (let j_parcours = 0; j_parcours < tableau_parcours.length; j_parcours++) {
          const parcoursId = tableau_parcours[j_parcours].id;
          const activites = await ActiviteParcours.findAll({
            where: {
              parcoursId: parcoursId,
            }
          });
          const idActivites = [];
          for (const act of activites) {
            idActivites.push(act.activiteId);
          }
  
          const newActParcours = moments_pleins[j].giveActivite(idActivites);
  
          if (newActParcours !== null) {
            //const oldActParc = ActiviteParcours.findByPk(parcoursId, newActParc)
            //if (oldActParc === undefined) {
              const parcId = tableau_parcours[j_parcours].id
              await ActiviteParcours.create({
                parcoursId: parcId,
                activiteId: newActParcours,
                indexMoment: j
              })
            //}
          }
        }
      }
    } catch (error) {
      // Gérer l'erreur ici
      console.error("Une erreur s'est produite :", error);
      // Vous pouvez également lancer une nouvelle erreur si nécessaire
      throw new Error("Une erreur s'est produite lors de l'association des parcours aux activités.");
    }
}
module.exports = associeParcoursActivite;