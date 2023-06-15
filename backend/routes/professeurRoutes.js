const express = require('express');
const ProfesseurControllers = require ('../controllers/professeursControllers');

const router = express.Router()

router.get ('/', ProfesseurControllers.getAllProfesseursController);
router.get ('/tuteur/:tuteurId', ProfesseurControllers.getEleveByTuteurController)
router.post('/', ProfesseurControllers.addProfesseurController);
router.delete('/:id', ProfesseurControllers.deleteProfesseurController);
router.delete('/all', ProfesseurControllers.deleteAllProfesseursController)

module.exports = router; 