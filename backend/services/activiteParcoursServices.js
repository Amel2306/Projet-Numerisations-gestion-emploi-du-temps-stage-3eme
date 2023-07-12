const ActiviteParcours = require ("../models/ActiviteParcours");
const Activite = require ("../models/Activite");
const Eleve = require("../models/Eleve");
const { Sequelize } = require('sequelize');

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

exports.getActiviteParcByProf = async (profId) => {
    //on recherche premièrement les activités du prof
    const activites = await Activite.findAll({
        where: {
            professeurId: profId
        }
    })

    // on recherche ces activités dans ActiviteParcours pour obtenir l'index du moment
    const act_of_prof = [];
    for (const act of activites) {
        const all_act_parc = await ActiviteParcours.findAll({
            where: {
                activiteId: act.id
            },
            order: [
                [Sequelize.literal('indexMoment'), 'ASC']
            ]
        })
        act_of_prof.push(...all_act_parc); // on rajoute toutes les activité-indexMoment-parcours associé à chaque activité
    }
    return act_of_prof;
}

exports.getActParcByProf = async (profId) => {

    const activites = await Activite.findAll({
        where: {
            professeurId: profId
        }
    })

    const tab_moments = {}

    for (let i = 0; i<10; i++) {
        tab_moments[i] = [];
        for (const act of activites ) {
            const act_present = await ActiviteParcours.findAll({
                where: {
                    activiteId: act.id,
                    indexMoment: i
                }
            })
            if (act_present.length > 0) {
                tab_moments[i].push(act_present)                
            }
        }
    }
    return tab_moments
}

exports.getActiviteParcByEleve = async (eleveId) => {
    const eleve = await Eleve.findByPk(eleveId)
    const parc_of_el = eleve.parcoursId
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