const Activite = require('../models/Activite');

exports.getAllActivites = async () => {
    console.log("j'arrive ici t'as capté")
    const activites = await Activite.findAll();
    return activites;
};

exports.getActiviteById = async (activiteId) => {
  try {
    const activite = await Activite.findByPk(activiteId);
    return activite;
  } catch (err) {
    throw new Error("Error Activite non trouvée");
  }
};

exports.getActiviteByEncadrant = async (professeurId) => {
  try {
    const activites = await Activite.findAll({
      where: {
        professeurId
      }
    })
    return activites
  } catch (err) {
    throw new Error("Error Activite non trouvée");
  }

}

exports.createActivite = async (activiteData) => {
    const newActivite = await Activite.create(activiteData);
    return newActivite;
};

exports.updateActivite = async (activiteData, activiteId) => {
  const activite = await Activite.findByPk(activiteId)
  const updatedAct = await activite.update(activiteData);
  return updatedAct;
}

exports.deleteActiviteById = async (activiteId) => {
  try {
    const activite = await Activite.findByPk(activiteId);

    if (!activite) {
      throw new Error("Activité non trouvée");
    }

    await activite.destroy();
  } catch (error) {
    throw new Error("Erreur lors de la suppression de l'activité", error);
  }
};

exports.deleteAllActivites = async () => {
  try {
    await Activite.destroy({ where: {} });
  } catch (error) {
    throw new Error("Erreur lors de la suppression des activités", error);
  }
};