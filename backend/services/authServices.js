const Professeur = require('../models/Professeur')
const Eleve = require('../models/Eleve')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.loginEleve = async (email, password) => {
    const eleve = await Eleve.findOne({
        where: {
            email
        }
    });
    if (eleve) {
        const hashpassword = eleve.password;
        try {
            const result = await bcrypt.compare(password, hashpassword);
            if (result) {
                const payload = { email: email, id: eleve.id };
                const secretKey = "ceci_est_une_clée_secrette";
                const options = { expiresIn: '2h' };
                const token = jwt.sign(payload, secretKey, options);
                const eleveId = eleve.id
                return { eleveId, token };
            } else {
                throw new Error('Mot de passe incorrect');
            }
        } catch (err) {
            throw new Error(err);
        }
    } else {
        throw new Error('Élève non trouvé');
    }
};

exports.loginProf = async (email, password) => {
    const prof = await Professeur.findOne({
        where: {
            email
        }
    });

    if (prof) {
        const hashpassword = prof.password;
        try {
            const result = await bcrypt.compare(password, hashpassword);
            if (result) {
                const payload = { email: email, id: prof.id };
                const secretKey = "ceci_est_une_clée_secrette";
                const options = { expiresIn: '2h' };
                const token = jwt.sign(payload, secretKey, options);
                const profId = prof.id
                return { profId, token };
            } else {
                throw new Error('Mot de passe incorrect');
            }
        } catch (err) {
            throw new Error(err);
        }
    } else {
        throw new Error('Professeur non trouvé');
    }
};

exports.logoutEleve = async (eleveId) => {
    const eleve = await Eleve.findByPk(eleveId);
    eleve.token = null;
    await eleve.save();
}

exports.logoutProf = async (profId) => {
    const eleve = await Eleve.findByPk(profId);
    eleve.token = null;
    await eleve.save();
}

