const express = require('express');
const ProfesseurControllers = require ('../controllers/professeursControllers');

const router = express.Router()

router.get ('/', ProfesseurControllers.getAllProfesseurs);
router.get ('/tuteur/:tuteurId', ProfesseurControllers.getEleveByTuteur)
router.post('/', ProfesseurControllers.addProfesseur);
router.delete('/:id', ProfesseurControllers.deleteProfesseur);
router.delete('/', ProfesseurControllers.deleteAllProfesseurs)

module.exports = router;