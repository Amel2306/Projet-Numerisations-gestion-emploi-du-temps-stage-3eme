const express = require('express');
const professeurControllers = require ('../controllers/professeursControllers');

const router = express.Router()

router.get ('/', professeurControllers.getAllProfesseur);
router.post('/', professeurControllers.addProfesseur);

module.exports = router;