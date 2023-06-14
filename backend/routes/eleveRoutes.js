const express = require('express');
const EleveControllers = require('../controllers/eleveControllers');

const router = express.Router();

router.get("/", EleveControllers.getAllEleves);
router.post("/", EleveControllers.addEleve);
router.post("/:id/confirmation", EleveControllers.confirmeEleve);
router.delete("/:id", EleveControllers.deleteEleve);
router.delete("/", EleveControllers.deleteAllEleve);

module.exports = router;