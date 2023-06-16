const express = require('express');
const activiteControllers = require('../controllers/activiteControllers');

const router = express.Router();

router.get('/', activiteControllers.getAllActivites);
router.post('/', activiteControllers.addActivite);
router.delete('/', activiteControllers.deleteAllActivites);
router.delete('/:id', activiteControllers.deleteActivite);

module.exports = router;