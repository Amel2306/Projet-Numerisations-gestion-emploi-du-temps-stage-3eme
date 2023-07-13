const Professeur = require('../models/Professeur');
const Eleve = require('../models/Eleve');
const { Op } = require('sequelize');

exports.getAllProfesseurs = async () =>{
  return await Professeur.findAll();
}

exports.getProfesseur = async (eleveId) => {
  return await Professeur.findByPk(eleveId)
}

exports.getProfByRole = async (role) => {
  try {
    return await Professeur.findAll({ 
      where: { 
        [Op.or]: [
          { role: role },
          { role: "Encadrant et Tuteur" } // dans tous les cas les professeurs ayant pour rôle 'Encadrant et Tuteur' seront toujours retournés
        ]
      } 
    });
  } catch (err) {
    throw new Error('Aucun élève trouvé ayant ce tuteur.');
  }
}

//permet de récupérer les élèves dont le tuteur est passé en paramètre
exports.getEleveByTuteur= async (tuteurId) =>{
  try {
    return await Eleve.findAll({ where: { professeurId: tuteurId } });
  } catch (err) {
    throw new Error('Aucun élève trouvé ayant ce tuteur.');
  }
}

exports.addProfesseur = async (profData) => {
  try {
    //dans le cas ou le professeur existe déja (=> son email est déjà enregistré), on le retourne lui sans en créer un nouveau
    const profExiste = await Professeur.findOne({
      where: {
        email: profData.email
      }
    })
    if (profExiste) {
      return profExiste
    }
    else {
      const newProfesseur = await Professeur.create(profData);
      return newProfesseur      
    }
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
