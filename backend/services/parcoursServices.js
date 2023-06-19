const Parcours = require ("../models/Parcours");
const Activite = require ("../models/Activite");
const associeParcoursActivite = require ("../utilities/parcoursFunctions");

exports.getAllParcours = async () => {
    const allParcours = await Parcours.findAll();
    return allParcours;
}

exports.getActivitesByParcours = async (parcoursId) => {
    const actOfParcours = await Activite.findAll({
        where: {
            parcoursId: parcoursId
        }
    })
    return actOfParcours;
}

exports.generateParcours = async  (nbParcours) => {
    try {
        await Parcours.destroy({where: {}});
        await associeParcoursActivite(nbParcours);
    } catch (err) {
        throw new Error("Error Parcours non réalisé");
    }
}