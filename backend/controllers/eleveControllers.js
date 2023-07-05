const EleveService = require('../services/eleveServices');

exports.getAllEleves = async (req, res) => {
  try {
    const eleves = await EleveService.getAllEleves();
    res.json(eleves);
  } catch (error) {
    res.status(500).json({ message: 'Error aucun eleves', error });
  }
};

exports.getEleve = async (req, res) => {
  const eleveId = req.params.id
  try {
    const eleve = await EleveService.getEleveById(eleveId);
    res.json(eleve)
  }catch (error) {
    res.status(500).json({ message: 'Error aucun eleve trouvé', error });
  }
}

exports.getElevesByActMoment = async (req, res) => {
  const activiteId = req.params.activiteId
  const indexMoment = req.params.indexMoment
  try {
    const eleves = await EleveService.getElevesByActMoment(activiteId, indexMoment);
    res.json(eleves)
  }catch (err) {
    res.status(404).json({message: "Aucun élève trouvé pour cette activité à ce moment"})
  }
}

exports.getBinome = async (req, res) => {
  const eleveId = req.params.id
  try {
    const binome = await EleveService.getBinome(eleveId)
    res.json(binome);
  }catch(err) {
    res.status(404).json({message: "Aucun binôme n'a été trouvé pour cet élève"})
  }
}

exports.addEleve = async (req, res) => {
  try {
    const { nom, prenom, email, numero_tel, numero_tel_parent, adress, etablissement } = req.body;
    const eleveData = {
      nom,
      prenom,
      email,
      numero_tel,
      numero_tel_parent,
      adress,
      etablissement,
    }
    const nouvelEleve = await EleveService.createEleve(eleveData);
    res.status(201).json(nouvelEleve);
  } catch (error) {
    res.status(400).json({ message: 'Error creation eleve dans controllers', error });
  }
};

exports.confirmeEleve = async (req, res) => {
  try {
    const eleveId = req.params.id;
    const eleve = await EleveService.getEleveById(eleveId);
    if (!eleve) {
       res.status(404).json({ message: 'Eleve not found' });
    }
    await EleveService.assignTuteur(eleve);
    res.status(200).json(eleve);
  } catch (error) {
     res.status(500).json({ message: 'Error lors de l\'attribution de tuteur', error });
  }
};

exports.sendPassword = async (req, res) => {
  const eleveId = req.params.id;
  try {
    await EleveService.sendPassword(eleveId);
    res.json({ message: "Mot de passe envoyé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'envoi de mot de passe à l'élève", error: err });
  }
};

exports.asignParcours = async (req, res ) => {
  const eleveId = req.params.id
  const {nbEleveMax} = req.body
  try {
    const eleve = await EleveService.assignParcours(eleveId,nbEleveMax)
    res.status(201).json(eleve)
  }catch (error) {
    res.status(500).json({ message: "Error lors de l'attribution d'un emploi du temps à un élève'" });
  }
}

exports.deleteEleve = async (req, res) => {
  try {
    const eleveId = req.params.id;
    const eleve = await EleveService.getEleveById(eleveId);
    if (!eleve) {
      return res.status(404).json({ message: "L'élève que vous souhaitez supprimer n'existe pas" });
    }
    await EleveService.deleteEleve(eleveId);
    res.status(200).json({ message: "L'élève a bien été supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'élève" }, error);
  }
};

exports.deleteAllEleve = async (req, res) => {
  try {
    const nb_eleve_supp = await EleveService.deleteAllEleve();
    res.status(200).json({ message: "Nombre d'élèves supprimés", nb_eleve_supp });
  } catch (error) {
    res.status(500).json({ message: "Error lors de la suppression de tous les élèves" });
  }
};

