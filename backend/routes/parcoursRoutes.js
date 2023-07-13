const express = require ("express");
const parcoursControllers = require ("../controllers/parcoursControllers");

const router = express.Router();
router.post('/', parcoursControllers.generateParcours);

module.exports = router;