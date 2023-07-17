const AuthServices = require ("../services/authServices");

exports.login = async (req, res) => {
    const personne = req.params.personne;
    const {email, password} = req.body

    try {
        if (personne === "eleves") {
            const eleve = await AuthServices.loginEleve(email, password)
            res.status(200).json(eleve)
        }
        else if (personne === "professeurs") {
            const prof = await AuthServices.loginProf(email, password)
            res.status(200).json(prof)
        }
        else {
            res.status(404).json({message: "Vous ne pouvez vous connecter qu'autant que professeur ou eleve"})
        }
    }catch (error) {
        res.status(404).json({message: "Impossible de se connecter"})
    }
}

exports.logout = async (req, res) => {
    const personne = req.params.personne 
    const personneId = req.params.id

    try {
        if (personne === "eleves") {
            const eleve = await AuthServices.logoutEleve(personneId)
            res.status(200).json({message: "Eleve déconnecté"})
        }
        else if (personne === "professeurs") {
            const prof = await AuthServices.logoutProf(personneId)
            res.status(200).json({message: "Professeur déconnecté"})
        }
        else {
            res.status(404).json({message: "Vous ne pouvez vous déconnecter qu'autant que professeur ou eleve"})
        }
    }catch (error) {
        res.status(404).json({message: "Impossible de se déconnecter"})
    }
}