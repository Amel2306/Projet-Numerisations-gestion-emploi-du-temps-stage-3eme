const express = require('express');
const EleveControllers = require('../controllers/eleveControllers');

const router = express.Router();

router.get("/", EleveControllers.getAllEleves);
router.get("/:id", EleveControllers.getEleve)
router.get("/activite", EleveControllers.getElevesByActMoment)
router.get("/binome/:id",EleveControllers.getBinome);
router.post("/", EleveControllers.addEleve);
router.post("/confirmation/:id", EleveControllers.confirmeEleve);
router.put("/password/:id", EleveControllers.sendPassword);
router.delete("/:id", EleveControllers.deleteEleve);
router.delete("/", EleveControllers.deleteAllEleve);

module.exports = router;