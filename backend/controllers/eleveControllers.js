const Eleve = require('../models/Eleve')
const bcrypt = require('bcrypt');
const Professeur = require ('../models/Professeir')
const  { generateRandomPassword, generatedPassword }  = require('../utilities/passwordFunctions');

exports.getAllEleves = async (req, res) => {
    const eleves = await Professeur.findAll();
    res.json(eleves);
};

//creer de façon provisoir un élève sans tuteur en attendant que l'admin confirme son inscription
exports.addEleve = async (req, res) => {
    const { nom, prenom, email, numero_tel, numero_tel_parent, adresse, etablissement} = req.body;
    const password = generatedPassword;
      try {
        const hashedPassword = await bcrypt.hash(password, 10); // Génère le hachage du mot de passe avec un coût de 10
        const nouvelEleve = await Professeur.create({ nom, prenom, email, numero_tel, metier, etablissement, role ,nb_eleve_tuteur, password: hashedPassword});
        res.status(201).json(nouvelEleve);
      } catch (error) {
        res.status(400).json({ message: 'Error creating professeur', error });
      }
}

//cas où l'admin sélectionne l'élève <=> on attribut un tuteur à l'utilisateur
exports.confirmeEleve = async (req, res) => {
    const eleveId = req.params

    try {
        const eleve = await Eleve.findByPk(eleveId);

        if (!eleve) {
            return res.status(404).json({ message: 'Eleve not found' });
        }
        
        const countOptions = {
            attributes: ['professeurId'],
            where: {
              $or: [
                { role: 'tuteur' },
                { role: 'tuteur et encadrant' }
              ]
            },
        
            group: ['professeurId'],
            include: [
              {
                model: Professeur,
                attributes: [],
              },
            ],
          };
          
    }catch (error) {
        return res.status(500).json({ message: 'Error assigning tuteur', error });
    }


}