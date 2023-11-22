const express = require("express");
const ReponseControllers = require("../controllers/reponseControllers");

const router = express.Router();

router.get("/question/:questionId", ReponseControllers.getReponsesByQuestions);
router.get("/foreleve/:eleveId", ReponseControllers.getReponsesForEleve);
router.get("/activite/:activiteId", ReponseControllers.getReponsesForActivie);
router.get("/tuteur/:profId", ReponseControllers.getReponsesByTuteur);
router.get("/encadrant/:profId", ReponseControllers.getResponsesByEncadrant);
router.get("/eleve/:eleveId", ReponseControllers.getResponsesByEleve);
router.get("/unique", ReponseControllers.getUniqueReponse);
router.post("/", ReponseControllers.addReponse);
router.put("/:id", ReponseControllers.updateReponse);
router.delete("/", ReponseControllers.deleteAllReponses);
router.delete("/:id", ReponseControllers.deleteReponse);

module.exports = router;
