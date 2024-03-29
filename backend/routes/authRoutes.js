const express = require("express");
const AuthControllers = require("../controllers/authControllers");

const router = express.Router();

router.post("/login/:personne", AuthControllers.login);
router.post("/logout/:personne/:id", AuthControllers.logout);

module.exports = router;
