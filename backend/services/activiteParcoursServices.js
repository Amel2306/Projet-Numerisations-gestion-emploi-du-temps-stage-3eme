const ActiviteParcours = require ("../models/ActiviteParcours");

exports.getAllActivitesParcours = async () => {
    const allActivitesParcours = await ActiviteParcours.findAll();
    return allActivitesParcours;
}

exports.getActiviteByParcours = async (parcoursId) => {
    const actOfParc = await ActiviteParcours.findAll({
        where: {
            parcoursId: parcoursId
        }
    })
    return actOfParc
}

exports.associateActiviteParcours = async (parcoursId, activiteId, indexMoment) => {
    const newAssociation = await ActiviteParcours.create({
        parcoursId,
        activiteId,
        indexMoment
    })
    return newAssociation;
}