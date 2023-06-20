const ActiviteParcours = require('../models/ActiviteParcours');
const Eleve = require('../models/Eleve');
const Parcours = require('../models/Parcours');
const Professeur = require('../models/Professeur');

exports.getAllEleves = async () => {
  const eleves = await Eleve.findAll();
  return eleves;
};

exports.getEleveById = async (eleveId) => {
  const eleve = await Eleve.findByPk(eleveId);
  return eleve;
};

exports.getElevesByActMoment = async (activiteId, indexMoment) => {
  const parcours = await ActiviteParcours.findAll({
    attributes: ['parcoursId'],
    where: {
      activiteId: activiteId,
      indexMoment: indexMoment
    }
  });

  console.log(parcours);

  const eleves = [];
  for (const parc of parcours) {
    console.log(parc.dataValues);
    const eleve_found = await Eleve.findAll({
      where: {
        parcoursId: parc.dataValues.parcoursId
      }
    });

    eleves.push(...eleve_found);
  }
  console.log(eleves);
  return eleves;
};

exports.createEleve = async (eleveData) => {
  const nouvelEleve = await Eleve.create(eleveData);
  return nouvelEleve;
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

exports.assignParcours = async (eleveId) => {
  const eleve = await Eleve.findByPk(eleveId);

  // Comptage des parcours
  const counts = await Eleve.findAndCountAll({
    attributes: ['parcoursId'],
    group: ['parcoursId'],
  });

  const all_parcours = await Parcours.findAll();

  // les parcours ayant été attribué à 2 personnes
  const parc_not_available = [];

  for (let i = 0; i < counts.rows.length; i++) {
    const count = counts.count[i].count; // récupère le count pour le parcoursId d'indice i
    const parcoursId = counts.rows[i].parcoursId;// récupère le parcoursId d'indice i
    if (count >= 2 ) {
      parc_not_available.push(parcoursId);
    }
  }

  for (const parc of all_parcours) {
    let indicateur = 0; // permet de savoir si id du parcours apparait dans parc_not_available

    for (const parc_not of parc_not_available) {
      if (parc_not === parc.id) {
        indicateur++;
      }
    }

    if (indicateur === 0) {
      await eleve.update({
        parcoursId: parc.id,
      });
      break;
    }
  }

  return eleve;
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