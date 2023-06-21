const Question = require ("../models/Question")

exports.getAllQuestions = async () => {
    const allQuestions = await Question.findAll();
    return allQuestions;
}

exports.getQuestionsByQuestionnaire = async (questionnaire) => {
    const questionByQuestionnaire = await Question.findAll({
        where: {
            questionnaire: questionnaire
        }
    })
    return questionByQuestionnaire;
}

exports.addQuestion = async (questionData) => {
    const newQuestion = await Question.create(questionData);
    return newQuestion;
}

exports.updateQuestion = async (questionId, questionData) => {
    const question = await Question.findByPk(questionId);
    const rows = await question.update(questionData);
    return (rows)
}

exports.deleteQuestion = async (questionId) => {
    await Question.destroy({
        where: {
            id: questionId
        }
    })
}