const ActiviteParcours = require ("../models/ActiviteParcours");
const Activite = require ("../models/Activite");
const Eleve = require("../models/Eleve");
const { Sequelize } = require('sequelize');
const Parcours = require("../models/Parcours");

exports.getAllActivitesParcours = async () => {
    const allActivitesParcours = await ActiviteParcours.findAll();
    return allActivitesParcours;
}

exports.getActiviteByParcours = async (parcoursId) => {
    const actOfParc = await ActiviteParcours.findAll({
        where: {
            parcoursId: parcoursId
        },
        order: [
            [Sequelize.literal('indexMoment'), 'ASC']
        ]
    })
    return actOfParc
}

exports.getActParcByProf = async (profId) => {

    //on commence par chercher les activités dont le prof est tuteur
    const activites = await Activite.findAll({
        where: {
            professeurId: profId
        }
    })

    const tab_moments = {}

    for (let i = 0; i<10; i++) {
        tab_moments[i] = []; // tableau de moment avec chaque case = {activités avec l'id du moment = i}
        // pour toutes les activités du prof on les cherche dans ActiviteParcours en fonction de l'index du moment
        for (const act of activites ) { 
            const act_present = await ActiviteParcours.findAll({
                where: {
                    activiteId: act.id,
                    indexMoment: i
                }
            })
            if (act_present.length > 0) { // si cette activité et ce moment existe on les retourne
                tab_moments[i].push(act_present)                
            }
        }
    }
    return tab_moments
}


exports.getActiviteParcByEleve = async (eleveId) => {
    const eleve = await Eleve.findByPk(eleveId)
    const parc_of_el = eleve.parcoursId
    // on recherche uniquement les activiteParcours du parcoursId associé à l'élève
    const activite_parc = await ActiviteParcours.findAll({
        where: {
            parcoursId: parc_of_el
        },
        order: [
            [Sequelize.literal('indexMoment'), 'ASC']
        ]
    })
    return activite_parc;
}

exports.associateActiviteParcours = async (parcoursId, activiteId, indexMoment) => {
    const newAssociation = await ActiviteParcours.create({
        parcoursId,
        activiteId,
        indexMoment
    })
    return newAssociation;
}

exports.associateActToAllParc = async (activiteId, indexMoment) => {
    const all_parcs = await Parcours.findAll({})

    for (const parc of all_parcs) {

        // on supprime l'activité du parcours de ce moment la 
        await ActiviteParcours.destroy({
            where: {
                parcoursId: parc.id,
                indexMoment
            }
        })

        await ActiviteParcours.destroy({
            where: {
                parcoursId: parc.id,
                activiteId
            }
        })

        await ActiviteParcours.create({
            parcoursId: parc.id,
            activiteId,
            indexMoment
        })
    }
    return true
}