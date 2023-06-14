const Activite = require ('../models/Activite');
const Parcours = require('../models/Parcours');
const {activiteByMoment} = require ('./momentFunctions');

async function associeParcoursActivite(nb_parcours) {

    //création des parcours
    var tableau_parcours = [];
    for (let i = 0; i< nb_parcours; i++) {
        const newParcours = await Parcours.create()
        tableau_parcours.push(newParcours)
    }

    //récupère les moments et leurs activités
    const moments_pleins = await activiteByMoment();

    for (const j = 0; j< moments_pleins.length; j++) {
        for (const j_parcours = 0; j_parcours<tableau_parcours.length; j_parcours++){
            const parcoursId = tableau_parcours[j_parcours].id;
            const activites = await Activite.findAll({
                where: {
                    parcoursId: parcoursId,
                }
            })
            const idActivites = []
            for (act of activites) {
                idActivites.push(act.id)
            }

            const newActParcours = moments_pleins[j].giveActivite(idActivites);

            if (newActParcours !== null) {
                const activitAdd = await Activite.findByPk(newActParcours);

                activitAdd.update({
                    parcoursId: tableau_parcours[j_parcours].id
                })
            } 
        }
    }
}