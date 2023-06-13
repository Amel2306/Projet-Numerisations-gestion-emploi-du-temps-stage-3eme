const Professeur = require('../models/Professeur')
const bcrypt = require('bcrypt');
const  { generateRandomPassword, generatedPassword }  = require('../utilities/passwordFunctions');

exports.getAllProfesseur = async (req, res) => {
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
