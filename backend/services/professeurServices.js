const Professeur = require('../models/Professeur');
const Eleve = require('../models/Eleve');

exports.getAllProfesseurs = async () =>{
  return await Professeur.findAll();
}

exports.getEleveByTuteur= async (tuteurId) =>{
  try {
    return await Eleve.findAll({ where: { professeurId: tuteurId } });
  } catch (err) {
    throw new Error('Aucun élève trouvé ayant ce tuteur.');
  }
}

exports.addProfesseur = async (profData) => {
  try {
    console.log("je recois ", profData)
    const newProfesseur = await Professeur.create(profData);
    return newProfesseur
  } catch (error) {
    throw new Error('Erreur lors de la création du professeur dans services.');
  }
}

exports.deleteProfesseur = async (professeurId) => {
  try {
    const prof = await Professeur.findByPk(professeurId);
    if (!prof) {
      throw new Error('Le professeur que vous souhaitez supprimer n\'existe pas.');
    }
    await prof.destroy();
  } catch (error) {
    throw new Error('Une erreur s\'est produite lors de la suppression du professeur.');
  }
}
exports.deleteAllProfesseurs = async() =>{
  try {
    return await Professeur.destroy({
      where: {}
    });
  } catch (error) {
    throw new Error('Erreur lors de la suppression de tous les professeurs.');
  }
}
