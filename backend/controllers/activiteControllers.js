const Activite = require ('../models/Activite');

exposts.getAllAcvtivites = async (req,res) => {
    try {
        const activites = await Activite.findAll();
        res.status(200).json(activites);
    } catch (err) {
        res.status(404).json({message: "Aucune activité n'a été trouvée"}, err)
    }
}

exports.getActivite = async (req, res) => {
    const activiteId = req.params.id
    try {
        const activite = await Activite.findByPk(activiteId);
        res.status(200).json(activite)
    }catch (err) {
        res.status(404).json({message: "Error Activite non trouvée"})
    }
}

exports.addActivite = async (req, res) => {
    const { nom, description, nb_realisations, nb_eleve_max, l1, l2, ma1, ma2, me1, me2, j1, j2, v1, v2, professeurId, parcoursId } = req.body;
    try {
      const activite = await Activite.create({
        nom,
        description,
        nb_realisations,
        nb_eleve_max,
        l1,
        l2,
        ma1,
        ma2,
        me1,
        me2,
        j1,
        j2,
        v1,
        v2,
        professeurId,
        parcoursId
      });
  
      return res.status(201).json({ message: 'Activité créée avec succès', activite });
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la création de l\'activité', error });
    }
  };
  
  exports.deleteActivite = async (req, res) => {
    const activiteId = req.params.id;
  
    try {
      const activite = await Activite.findByPk(activiteId);
  
      if (!activite) {
        return res.status(404).json({ message: 'Activité non trouvée' });
      }
  
      await activite.destroy();
  
      return res.status(200).json({ message: 'Activité supprimée avec succès' });
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la suppression de l\'activité', error });
    }
  };
  
  exports.deleteAllActivites = async (req, res) => {
    try {
      await Activite.destroy({
        where: {}
      });
  
      return res.status(200).json({ message: 'Toutes les activités ont été supprimées' });
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la suppression des activités', error });
    }
  };
  
  