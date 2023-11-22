const parcoursServices = require("../services/parcoursServices");

//permet de générer des parcours
//nbParcours = nombre de parcours souhaité
//nbEleveMax est le nombre d'élève que peux au maximum avoir un parcours
exports.generateParcours = async (req, res) => {
  const { nbParcours, nbEleveMax } = req.body;
  try {
    await parcoursServices.generateParcours(nbParcours, nbEleveMax);
    res
      .status(200)
      .json({ message: "Génération des emplois du temps a été un succés" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error lors de la génération de parcours" });
  }
};
