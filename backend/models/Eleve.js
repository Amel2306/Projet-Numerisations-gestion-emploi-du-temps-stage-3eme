const { DataTypes } = require('sequelize');
const db = require('../config/dbConfig');
const Professeur = require ('./Professeur');
const Parcours = require ('./Parcours')

const Eleve = db.define('Eleve', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero_tel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero_tel_parent: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    etablissement: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    professeurId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Professeurs',
          key: 'id',
        },
    },

    parcoursId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Parcours', 
          key: 'id',
        },
    },
});


Eleve.belongsTo(Professeur, {
    foreignKey: 'professeurId',
    onDelete: 'SET NULL', 
});
Professeur.hasMany(Eleve, {
    foreignKey: 'professeurId',
});


Eleve.belongsTo(Parcours, {
    foreignKey: 'parcoursId',
    onDelete: 'SET NULL', 
});
Parcours.hasMany(Eleve, {
    foreignKey: 'parcoursId'
})

module.exports = Eleve;