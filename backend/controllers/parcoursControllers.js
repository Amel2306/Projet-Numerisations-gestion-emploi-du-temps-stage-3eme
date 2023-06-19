const parcoursServices = require ("../services/parcoursServices");

exports.getAllActivitesByAllParcours = async (req, res) => {
    try {
        const parcoursActivites = {};
        const allParcours = await parcoursServices.getAllParcours();
        for (const parc of allParcours) {
            const activiteParcours = await parcoursServices.getActivitesByParcours(parc.id);
            parcoursActivites[parc.id] = activiteParcours
        }
        res.status(200).json(parcoursActivites)
    } catch (err) {
        res.status(500).json({message: "Error lors de la récupération des parcours et de leur activtiés"})
    }
}

exports.generateParcours = async  (req, res) => {
    console.log("on rentre")
    const {nbParcours} = req.body
    try {
        await parcoursServices.generateParcours(nbParcours)
        res.status(500).json({message: "Génération des emplois du temps a été un succés"})
    } catch (err) {
        res.status(500).json({message: "Error lors de la génération de parcours"})
    }
}