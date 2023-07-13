const { parseStringStyle } = require("@vue/shared");
const QuestionServices = require ("../services/questionServices")

exports.getAllQuestions = async (req, res) => {
    try {
        const allQuestions = await QuestionServices.getAllQuestions();
        res.status(200).json(allQuestions)
    }catch (error) {
        res.status(404).json({message: "Error aucune question n'a été trouvée", error})
    }
}

exports.getQuestionsByQuestionnaire = async (req, res) => {
    const questionnaire = req.params.questionnaire
    try {
        const questions = await QuestionServices.getQuestionsByQuestionnaire(questionnaire);
        res.status(200).json(questions)
    }catch (error){
        res.status(404).json({message: "Error aucune question n'a été trouvée pour ce questionnaire", error})
    }
}

exports.addQuestion = async (req, res) => {
    const {contenu, questionnaire} = req.body
    try {
        const questionData = {
            contenu,
            questionnaire
        }

        const newQuestion = await QuestionServices.addQuestion(questionData);

        res.status(201).json(newQuestion)
    }catch (error) {
        res.status(500).json({message: "Error impossible de rajouter une question", error})
    }
}

exports.updateQuestion = async (req, res) => {
    const questionId = req.params.id
    const {contenu, questionnaire} = req.body

    try {
        const questionData = {
            contenu,
            questionnaire
        } 

        const questionUpdated = await QuestionServices.updateQuestion(questionId, questionData);

        res.status(200).json(questionUpdated)
    }catch (error) {
        res.status(500).json({message: "Impossible de mettre à jour cette question", error})
    }
}

exports.deleteQuestion = async (req, res) => {
    const questionId = req.params.id
    try {
        await QuestionServices.deleteQuestion(questionId)
        res.status(200).json({message: "Question supprimée avec succés"})
    }catch (error) {
        res.status(500).json({message: "Impossible de supprimer une question", error})
    }
}

