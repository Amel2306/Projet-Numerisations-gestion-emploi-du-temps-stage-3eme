const express = require('express');
const EleveControllers = require('../controllers/eleveControllers');

const router = express.Router();

router.get("/", EleveControllers.getAllEleves);
router.get("/groupe/:id",EleveControllers.getGroupe);
router.get("/:id", EleveControllers.getEleve);
router.get("/activite/:activiteId/:indexMoment", EleveControllers.getElevesByActMoment);
router.post("/", EleveControllers.addEleve);
router.put("/confirmation/:id", EleveControllers.confirmeEleve);
router.put("/password/:id", EleveControllers.sendPassword);
router.put("/parcours/:id", EleveControllers.asignParcours);
router.put("/:id", EleveControllers.updateEleve);
router.delete("/:id", EleveControllers.deleteEleve);
router.delete("/", EleveControllers.deleteAllEleve);

module.exports = router;