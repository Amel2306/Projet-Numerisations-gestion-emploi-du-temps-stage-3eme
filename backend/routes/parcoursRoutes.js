const express = require ("express");
const parcoursControllers = require ("../controllers/parcoursControllers");

const router = express.Router();

router.get('/', parcoursControllers.getAllActivitesByAllParcours);
router.post('/', parcoursControllers.generateParcours);

module.exports = router;