const Professeur = require("../models/Professeur");
const Eleve = require("../models/Eleve");
const { Op } = require("sequelize");
const {
  generateRandomPassword,
  generatedPassword,
} = require("../utilities/passwordFunctions");
const emailTemplates = require("../utilities/emailTemplates");
const bcrypt = require("bcrypt");

exports.getAllProfesseurs = async () => {
  return await Professeur.findAll();
};

exports.getProfesseur = async (eleveId) => {
  return await Professeur.findByPk(eleveId);
};

exports.getProfByRole = async (role) => {
  try {
    return await Professeur.findAll({
      where: {
        [Op.or]: [
          { role: role },
          { role: "Encadrant et Tuteur" }, // dans tous les cas les professeurs ayant pour rôle 'Encadrant et Tuteur' seront toujours retournés
        ],
      },
    });
  } catch (err) {
    throw new Error("Aucun élève trouvé ayant ce tuteur.");
  }
};

//permet de récupérer les élèves dont le tuteur est passé en paramètre
exports.getEleveByTuteur = async (tuteurId) => {
  try {
    return await Eleve.findAll({ where: { professeurId: tuteurId } });
  } catch (err) {
    throw new Error("Aucun élève trouvé ayant ce tuteur.");
  }
};

//envoi mdp à l'élève pour lui permettre de se connecter
exports.sendPassword = async (profId) => {
  try {
    const prof = await Eleve.findByPk(profId);
    const password = generatedPassword; // on généère un mot de passe au hazard
    const recipientEmail = prof.email;

    //on envoie le mail avec le mot de passe
    await emailTemplates.sendPasswordEmail(recipientEmail, password);

    // on hash ensuite le mot de passe pour l'enregistrer dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10);

    //on modifie le mot de passe de l'élève
    await prof.update({
      password: hashedPassword,
    });

    return { message: "Mot de passe envoyé au professeur avec succès" };
  } catch (error) {
    throw new Error("Erreur lors de l'envoi de mot de passe au professeur");
  }
};

exports.addProfesseur = async (profData, password) => {
  try {
    //dans le cas ou le professeur existe déja (=> son email est déjà enregistré), on le retourne lui sans en créer un nouveau
    const profExiste = await Professeur.findOne({
      where: {
        email: profData.email,
      },
    });
    if (profExiste) {
      return profExiste;
    }
    console.log(profData);
    const newProfesseur = await Professeur.create(profData);
    console.log(newProfesseur);
    if (password) {
      console.log("a psw");
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("ok");
      newProfesseur.update({
        password: hashedPassword,
      });
    } else {
      console.log("n'a rien");
      this.sendPassword(newProfesseur.id);
    }
    return newProfesseur;
  } catch (error) {
    throw new Error("Erreur lors de la création du professeur dans services.");
  }
};

exports.updateProf = async (profId, profData) => {
  const prof = await Professeur.findByPk(profId);
  if (!prof) {
    throw new Error("Le professeur que vous souhaitez modifier n'existe pas");
  }
  await prof.update(profData);
  return prof;
};

exports.deleteProfesseur = async (professeurId) => {
  try {
    const prof = await Professeur.findByPk(professeurId);
    if (!prof) {
      throw new Error(
        "Le professeur que vous souhaitez supprimer n'existe pas."
      );
    }
    await prof.destroy();
  } catch (error) {
    throw new Error(
      "Une erreur s'est produite lors de la suppression du professeur."
    );
  }
};

exports.deleteAllProfesseurs = async () => {
  try {
    return await Professeur.destroy({
      where: {
        role: {
          [Op.ne]: "Admin",
        },
      },
    });
  } catch (error) {
    throw new Error("Erreur lors de la suppression de tous les professeurs.");
  }
};
