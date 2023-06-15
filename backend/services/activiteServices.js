const Activite = require('../models/Activite');

exports.getAllActivites = async () => {
  try {
    const activites = await Activite.findAll();
    return activites;
  } catch (err) {
    throw new Error("Aucune activité n'a été trouvée", err);
  }
};

exports.getActiviteById = async (activiteId) => {
  try {
    const activite = await Activite.findByPk(activiteId);
    return activite;
  } catch (err) {
    throw new Error("Error Activite non trouvée");
  }
};

exports.createActivite = async (activiteData) => {
  try {
    const activite = await Activite.create(activiteData);
    return activite;
  } catch (error) {
    throw new Error("Erreur lors de la création de l'activité", error);
  }
};

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