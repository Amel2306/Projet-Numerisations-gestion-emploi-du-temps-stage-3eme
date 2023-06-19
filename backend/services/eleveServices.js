const Eleve = require('../models/Eleve');
const Professeur = require('../models/Professeur');

exports.getAllEleves = async () => {
  const eleves = await Eleve.findAll();
  return eleves;
};

exports.createEleve = async (eleveData) => {
  const nouvelEleve = await Eleve.create(eleveData);
  return nouvelEleve;
};

exports.getEleveById = async (eleveId) => {
  const eleve = await Eleve.findByPk(eleveId);
  return eleve;
};

// Fonction pour attribuer un tuteur à un élève 
//au moment ou celui-ci est confirmé par l'admin
exports.assignTuteur = async (eleve) => {
    try {
      const counts = await Eleve.findAndCountAll({
        attributes: ['professeurId'],
        group: 'professeurId'
      });
  
      const avaibleProfs = [];
      const notAvaibleProfs = [];
  
      for (let i = 0; i < counts.rows.length; i++) {
        const professeurId = counts.rows[i].professeurId;
  
        if (professeurId !== null) {
          const prof = await Professeur.findByPk(professeurId);
  
          if (prof.dataValues.nb_eleve_tuteur > counts.count[i].count) {
            avaibleProfs.push(professeurId);
          } else {
            notAvaibleProfs.push(professeurId);
          }
        }
      }
  
      const allProfs = await Professeur.findAll();
      for (const item of allProfs) {
        if (item.nb_eleve_tuteur > 0) {
          let indicateur = 0;
          for (const profNot of notAvaibleProfs) {
            if (profNot === item.id) {
              indicateur++;
            }
          }
          if (indicateur === 0) {
            avaibleProfs.push(item.id);
          }
        }
      }
      console.log (avaibleProfs);
      if (avaibleProfs.length === 0) {
        return false; // Retourne false si aucun tuteur disponible
      }
  
      const selectedProfesseur = avaibleProfs[0];
  
      await eleve.update({ professeurId: selectedProfesseur });
  
      return true; // Retourne true si l'attribution du tuteur est réussi
    } catch (error) {
      throw new Error("Error lors de l'attribution du tuteur");
    }
};

exports.deleteEleve = async (eleveId) => {
  const eleve = await Eleve.findByPk(eleveId);
  if (!eleve) {
    throw new Error("L'élève que vous souhaitez supprimer n'existe pas");
  }
  await eleve.destroy();
};

exports.deleteAllEleve = async () => {
  const nb_eleve_supp = await Eleve.destroy({ where: {} });
  return nb_eleve_supp;
};