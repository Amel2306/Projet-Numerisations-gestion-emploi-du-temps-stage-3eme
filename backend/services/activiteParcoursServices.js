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
    const activites = await Activite.findAll({
        where: {
            professeurId: profId
        }
    })

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
        for (const act_parc of all_act_parc) {
            act_of_prof.push(act_parc)
        }
    }
    return act_of_prof;
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