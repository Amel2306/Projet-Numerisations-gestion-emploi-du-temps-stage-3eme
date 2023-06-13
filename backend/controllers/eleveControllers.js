const Eleve = require('../models/Eleve')
const bcrypt = require('bcrypt');
const Professeur = require ('../models/Professeur')
const  { generateRandomPassword, generatedPassword }  = require('../utilities/passwordFunctions');

exports.getAllEleves = async (req, res) => {
    const eleves = await Eleve.findAll();
    res.json(eleves);
};

//creer de façon provisoir un élève sans tuteur en attendant que l'admin confirme son inscription
exports.addEleve = async (req, res) => {
    const { nom, prenom, email, numero_tel, numero_tel_parent, adress, etablissement} = req.body;
    const password = generatedPassword;
      try {
        const hashedPassword = await bcrypt.hash(password, 10); // Génère le hachage du mot de passe avec un coût de 10
        const nouvelEleve = await Eleve.create({ nom, prenom, email, numero_tel, numero_tel_parent, adress, etablissement, password: hashedPassword});
        res.status(201).json(nouvelEleve);
      } catch (error) {
        res.status(400).json({ message: 'Error creation eleve', error });
      }
}

exports.confirmeEleve = async (req, res) => {
  const eleveId = req.params.id;

  try {
    const eleve = await Eleve.findByPk(eleveId);

    if (!eleve) {
      return res.status(404).json({ message: 'Eleve not found' });
    }

    const counts = await Eleve.findAndCountAll({
      attributes: ['professeurId'],
      group: 'professeurId'
    });
    console.log(counts);
    //res.json(counts);

    const avaibleProfs= [];
    const notAvaibleProfs = [];

    for (let i = 0; i < counts.rows.length; i++) {
      const professeurId = counts.rows[i].professeurId;
      console.log(professeurId);
    
      if (professeurId !== null) {
        const prof = await Professeur.findByPk(professeurId);
        //console.log(prof);
        if (prof.dataValues.nb_eleve_tuteur > counts.count[i].count) {
          console.log("**************")
          avaibleProfs.push(professeurId);
          console.log(avaibleProfs);
        }
        else {
          notAvaibleProfs.push(professeurId);
        }
      }
    }

    console.log("**************")
    console.log(avaibleProfs);
    console.log(notAvaibleProfs);

    /*const notAvailableProfesseursIds = counts.rows
    .filter((row) => {
      const professeurId = row.professeurId;
      const professeur = Professeur.findByPk(professeurId);
      return professeurId !== null && professeur.nb_eleve_tuteur <= row.count;
    })
    .map((row) => row.professeurId);*/

    const allProfs = await Professeur.findAll();
    for (const item of allProfs) {
      if (item.nb_eleve_tuteur > 0) {
        let indicateur = 0;
        for (const profNot of notAvaibleProfs) {
          if (profNot === item.id) {
            indicateur ++;
          }
        }
        if (indicateur === 0) {
          avaibleProfs.push(item.id)
        }
      }
    }
    /*const additionalProfesseurs = await Professeur.findAll({
      attributes: ['id'],
      where: {
        nb_eleve_tuteur: {
          [Op.gte]: 1
        },
        id: {
          [Op.not]: notAvailableProfesseursIds
        }
      }
    });*/
    //const additionalIds = additionalProfesseurs.map((professeur) => professeur.id);

    console.log(avaibleProfs);

    //const allProfesseurs = avaibleProfs.concat(additionalProfesseurs);

    if (avaibleProfs.length === 0) {
      return res.status(404).json({ message: 'Pas de tuteur dispo ajouter Mylène' });
    }

    const selectedProfesseur = avaibleProfs[0];

    await eleve.update({ professeurId: selectedProfesseur });

    return res.status(200).json({ message: 'Tuteur bien assigné' });

  } catch (error) {
    return res.status(500).json({ message: 'Error lors de l\'attribution de tuteur', error });
  }
};

exports.getEleveByTuteur = async (req, res) => {
  const professeurId = req.params.tuteurId;

  try {
    const eleves = await Eleve.findAll({where: {professeurId}})
    res.status(200).json(eleves)
  }
  catch (err) {
    res.status(404).json({message: "Aucun élève trouvé ayant comme tuteur ce tuteur. ", err});
  }
}

exports.deleteEleve = async (req, res) => {
  const eleveId = res.params.id;
  try {
    const eleve = await Eleve.findByPk(eleveId)
    if (!eleve) {
      return res.status(404).json({message: "L'élève que vous souhaitez supprimer n'existe pas"})
    }
    await eleve.destroy();
    res.status(200).json({message: "L'élève a bien été supprimé"})

  }catch (err) {
    res.status(500).json({message: "Une erreur s'est produite lors de la suppression de l'élève"});
  }
}

exports.deleteAllEleve = async (req, res) => {
  try {
    const nb_eleve_supp = await Eleve.destroy({
      where: {}
    })
    res.status(200).json({message: "Nombre d'élèves supprimés", nb_eleve_supp})
  }catch(err) {
    res.status(500).json({message: "Error lors de la suppression de tous les élèves"})
  }
}