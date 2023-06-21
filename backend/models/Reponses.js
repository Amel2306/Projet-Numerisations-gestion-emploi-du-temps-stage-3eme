const { DataTypes } = require('sequelize');
const db = require('../config/dbConfig');
const Question = require ('./Question');
const Activite = require ('./Activite');
const Professeur = require ('./Professeur');
const Eleve = require ('./Eleve');


const Reponse = db.define('Reponse', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    contenu: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    repondantEleveId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Eleves', 
          key: 'id',
        },
    },
    repondantProfId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Professeurs', 
          key: 'id',
        },
    },
    eleveConcerneId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Eleves', 
          key: 'id',
        },
    },
    questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Questions', 
          key: 'id',
        },
    },
    activiteId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Activites', 
          key: 'id',
        },
    }
})

Reponse.belongsTo(Eleve, {
    foreignKey: 'repondantEleveId',
    onDelete: 'CASCADE'
});

Reponse.belongsTo(Professeur, {
    foreignKey: 'repondantProfId',
    onDelete: 'CASCADE'
});

Reponse.belongsTo(Eleve, {
    foreignKey: 'eleveConcerneId',
    onDelete: 'CASCADE'
});

Reponse.belongsTo(Question, {
    foreignKey: 'questionId',
    onDelete: 'CASCADE'
});

Reponse.belongsTo(Activite, {
    foreignKey: 'activiteId',
    onDelete: 'CASCADE'
});

module.exports = Reponse;