const Professeur = require('../models/Professeur')
const bcrypt = require('bcrypt');
const  { generateRandomPassword, generatedPassword }  = require('../utilities/passwordFunctions');

exports.getAllProfesseurs = async (req, res) => {
    const professeurs = await Professeur.findAll();
    res.json(professeurs);
};


exports.addProfesseur = async (req, res) => {
    const { nom, prenom, email, numero_tel, metier, etablissement, role, nb_eleve_tuteur} = req.body;
    const password = generatedPassword;
      try {
        const hashedPassword = await bcrypt.hash(password, 10); // Génère le hachage du mot de passe avec un coût de 10
        const nouveauProfesseur = await Professeur.create({ nom, prenom, email, numero_tel, metier, etablissement, role ,nb_eleve_tuteur, password: hashedPassword});
        res.status(201).json(nouveauProfesseur);
      } catch (error) {
        res.status(400).json({ message: 'Error creating professeur', error });
      }
}

//suppression d'un professeur en particulier
exports.deleteProfesseur = async (req, res) => {
  const professeurId = res.params.id;
  try {
    const prof = await Professeur.findByPk(professeurId)
    if (!prof) {
      return res.status(404).json({message: "Le prof que vous souhaitez supprimer n'existe pas"})
    }
    await prof.destroy();
    res.status(200).json({message: "Le professeur a bien été supprimé"})

  }catch (err) {
    res.status(500).json({message: "Une erreur s'est produite lors de la suppression du prof"});
  }
}

//suppression de tous les professeurs
exports.deleteAllProfesseurs = async (req, res) => {
  try {
    const nb_prof_supp = await Professeur.destroy({
      where: {}
    })
    res.status(200).json({message: "Nombre de prof supprimés", nb_prof_supp})
  }catch(err) {
    res.status(500).json({message: "Error lors de la suppression de tous les professeurs"})
  }
}
