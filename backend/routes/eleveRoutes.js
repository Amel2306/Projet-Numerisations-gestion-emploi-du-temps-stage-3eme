const express = require('express');
const EleveControllers = require('../controllers/eleveControllers');

const router = express.Router();

router.get("/", EleveControllers.getAllEleves);
router.get("/binome/:id",EleveControllers.getBinome);
router.get("/:id", EleveControllers.getEleve);
router.get("/activite/:activiteId/:indexMoment", EleveControllers.getElevesByActMoment);
router.post("/", EleveControllers.addEleve);
router.post("/confirmation/:id", EleveControllers.confirmeEleve);
router.put("/password/:id", EleveControllers.sendPassword);
router.put("/parcours/:id", EleveControllers.asignParcours);
router.delete("/:id", EleveControllers.deleteEleve);
router.delete("/", EleveControllers.deleteAllEleve);

module.exports = router;