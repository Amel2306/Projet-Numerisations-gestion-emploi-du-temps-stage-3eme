const express = require('express');
const EleveControllers = require('../controllers/eleveControllers');

const router = express.Router();

router.get("/", EleveControllers.getAllEleves);
router.get("/activite", EleveControllers.getElevesByActMoment)
router.post("/", EleveControllers.addEleve);
router.post("/confirmation/:id", EleveControllers.confirmeEleve);
router.delete("/:id", EleveControllers.deleteEleve);
router.delete("/", EleveControllers.deleteAllEleve);
router.post("/parcours/:id", EleveControllers.asignParcours);

module.exports = router;