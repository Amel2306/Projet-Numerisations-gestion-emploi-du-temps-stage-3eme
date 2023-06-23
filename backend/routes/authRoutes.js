const express = require ("express")
const AuthControllers = require ("../controllers/authController");

const router = express.Router();

router.post("/login/:personne", AuthControllers.login);
router.post("/logout/:personne/:id", AuthControllers.logout);

module.exports = router;