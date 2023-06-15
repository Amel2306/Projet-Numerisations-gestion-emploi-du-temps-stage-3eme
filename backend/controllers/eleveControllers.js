const bcrypt = require('bcrypt');
const { generatedPassword } = require('../utilities/passwordFunctions');
const eleveService = require('../services/eleveServices');

exports.getAllEleves = async (req, res) => {
  try {
    const eleves = await eleveService.getAllEleves();
    res.json(eleves);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving eleves', error });
  }
};

exports.addEleve = async (req, res) => {
  try {
    const { nom, prenom, email, numero_tel, numero_tel_parent, adress, etablissement } = req.body;
    const password = generatedPassword;
    const hashedPassword = await bcrypt.hash(password, 10);
    const eleveData = {
      nom,
      prenom,
      email,
      numero_tel,
      numero_tel_parent,
      adress,
      etablissement,
      password: hashedPassword,
    }
    const nouvelEleve = await eleveService.createEleve(eleveData);
    res.status(201).json(nouvelEleve);
  } catch (error) {
    res.status(400).json({ message: 'Error creation eleve dans controllers', error });
  }
};

exports.confirmeEleve = async (req, res) => {
  try {
    const eleveId = req.params.id;
    const eleve = await eleveService.getEleveById(eleveId);
    if (!eleve) {
       res.status(404).json({ message: 'Eleve not found' });
    }
   await eleveService.assignTuteur(eleve);
    res.status(200).json({ message: 'Tuteur bien assigné' });
  } catch (error) {
     res.status(500).json({ message: 'Error lors de l\'attribution de tuteur', error });
  }
};

exports.deleteEleve = async (req, res) => {
  try {
    const eleveId = req.params.id;
    const eleve = await eleveService.getEleveById(eleveId);
    if (!eleve) {
      return res.status(404).json({ message: "L'élève que vous souhaitez supprimer n'existe pas" });
    }
    await eleveService.deleteEleve(eleveId);
    res.status(200).json({ message: "L'élève a bien été supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'élève" });
  }
};

exports.deleteAllEleve = async (req, res) => {
  try {
    const nb_eleve_supp = await eleveService.deleteAllEleve();
    res.status(200).json({ message: "Nombre d'élèves supprimés", nb_eleve_supp });
  } catch (error) {
    res.status(500).json({ message: "Error lors de la suppression de tous les élèves" });
  }
};