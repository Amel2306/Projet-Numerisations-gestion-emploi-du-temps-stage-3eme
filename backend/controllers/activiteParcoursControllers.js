const ActiviteParcoursServices = require ("../services/activiteParcoursServices");
const ParcoursServices = require ("../services/parcoursServices");

exports.getAllActivitesParcours = async (req, res) => {
    try {
        const allActParc = await ActiviteParcoursServices.getAllActivitesParcours();
        res.json(allActParc);
    }catch (err){
        res.status(404).json({message: "Aucune activité - parcours n'a été trouvé"})
    }
}

exports.getActivitesByAllParcours = async (req, res) => {
    try {
        const actAllParc = {}
        const allParc = await ParcoursServices.getAllParcours();
        for (const actParc of allParc) {
            const allActParc = await ActiviteParcoursServices.getActiviteByParcours(actParc.id)
            actAllParc[actParc.id] = allActParc;
        }
        res.json(actAllParc);
    } catch (err) {
        res.status(404).json({message: "Aucune activité - parcours n'a été trouvé"})
    }
}

exports.getActiviteByParcours = async (req, res) => {
    const parcoursId = req.params.parcoursId
    try {
        const actOfParc = await ActiviteParcoursServices.getActiviteByParcours(parcoursId);
        res.json(actOfParc)
    } catch (err) {
        res.status(404).json({message: "Aucune activtié n'est lié à ce parcours"})
    }
}

exports.associateActiviteParcours= async (req, res) => {
    const { parcoursId, activiteId, indexMoment} = req.body
    try {
        const newAsso = await ActiviteParcoursServices.associateActiviteParcours(parcoursId, activiteId, indexMoment);
        res.json(newAsso);
    } catch (err) {
        res.status(500).json({message: "Impossible de créer une nouvelle association", err})
    }
}