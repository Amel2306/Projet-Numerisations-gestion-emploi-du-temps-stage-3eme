const { DataTypes } = require('sequelize');
const db = require('../config/dbConfig');

const Question = db.define('Question', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    contenu: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    questionnaire: {
        type: DataTypes.ENUM,
        values: ['Eleve', 'Encadrant', 'Tuteur'], // question va apparaitre dans la fiche d'évaluation de ...
        allowNull: false
    }
});

module.exports = Question;