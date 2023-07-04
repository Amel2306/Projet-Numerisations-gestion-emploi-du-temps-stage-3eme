const express = require ("express");
const QuestionControllers = require ("../controllers/questionControllers");

const router = express.Router();

router.get("/", QuestionControllers.getAllQuestions);
router.get("/questionnaire/:questionnaire", QuestionControllers.getQuestionsByQuestionnaire);
router.post("/", QuestionControllers.addQuestion);
router.put("/:id", QuestionControllers.updateQuestion);
router.delete("/:id", QuestionControllers.updateQuestion);

module.exports = router;