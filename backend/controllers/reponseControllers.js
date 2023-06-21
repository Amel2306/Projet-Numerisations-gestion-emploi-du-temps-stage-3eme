const ReponseServices = require ("../services/reponseServices");

exports.getReponsesByQuestions = async (req, res) => {
    const questionId = req.params.questionId

    try {
        const reponse = await ReponseServices.getReponsesByQuestions(questionId);
        res.status(200).json(reponse);
    }
    catch (error) {
        res.status(404).json({message: "Error aucune réponse n'a été trouvée pour cette question", error})
    }
}

exports.getReponsesForEleve = async (req, res) => {
    const eleveId = req.params.eleveId;
    const {questionnaire} = req.body;

    try {
        const all_reponses = await ReponseServices.getReponsesForEleve(eleveId, questionnaire)
        res.status(200).json(all_reponses)

    }catch (error) {
        res.status(404).json({message: "Error aucune réponse n'a été trouvée concernant cet élève", error})
    }
}

exports.getReponsesForActivie = async (req, res) => {
    const activiteId = req.params.activiteId;
    try {
        const all_reponses = await ReponseServices.getReponsesForActivie(activiteId)
        res.status(200).json(all_reponses)

    }catch (error) {
        res.status(404).json({message: "Error aucune réponse n'a été trouvée concernant cette activité", error})
    }
}

exports.getReponsesByTuteur = async (req, res) => {
    const profId = req.params.profId;

    try {
        const all_reponses = await ReponseServices.getReponsesByTuteur(profId)
        res.status(200).json(all_reponses)

    }catch (error) {
        res.status(404).json({message: "Error aucune réponse n'a été trouvée concernant ce tuteur", error})
    }
}

exports.getResponsesByEncadrant = async (req, res) => {
    const profId = req.params.profId;

    try {
        const all_reponses = await ReponseServices.getResponsesByEncadrant(profId)
        res.status(200).json(all_reponses)

    }catch (error) {
        res.status(404).json({message: "Error aucune réponse n'a été trouvée concernant cet encadrant", error})
    }
}

exports.addReponse = async (req, res) => {
    const {contenu, repondantEleveId, repondantProfId, eleveConcerneId, questionId, activiteId} = req.body
    try {
        const reponseData = {
            contenu,
            repondantEleveId,
            repondantProfId,
            eleveConcerneId,
            questionId,
            activiteId,
        }

        const new_reponse = await ReponseServices.addReponse(reponseData)
        res.status(201).json(new_reponse)
    }catch (error) {
        res.status(500).json({message: "Error impossible de créer une nouvelle réponse", error})
    }
}

exports.updateReponse = async (req, res) => {
    const reponseId = req.params.id
    const {contenu} = req.body;
    
    try {
        const reponseUpdated = await ReponseServices.updateReponse(reponseId, contenu)
        res.status(200).json(reponseUpdated)
    }catch (error) {
        res.status(500).json({message: "Error impossible de modifier la réponse", error})
    }
}

exports.deleteReponse = async (req, res) => {
    const reponseId = req.params.id;
    try {
        await ReponseServices.deleteReponse(reponseId)
        res.status(200).json({message: "Réponse supprimé avec succés"})

    }catch (error) {
        res.status(500).json({message: "Error impossible de supprimé la réponse", error})
    }
}

exports.deleteAllReponses = async (req, res) => {
    try {
        await ReponseServices.deleteAllReponses();
        res.status(200).json({message: "Les réponses ont été supprimées avec succés"})
    }catch (error) {
        res.status(500).json({message: "Error impossible de supprimé les réponses", error})
    }
}