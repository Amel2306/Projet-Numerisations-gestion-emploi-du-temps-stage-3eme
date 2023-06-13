const { DataTypes } = require('sequelize');
const db = require('../config/dbConfig');
const Professeur = require ('./Professeur');

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
        allowNull: false
    },
    professeurId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Professeurs', // Nom de la table référencée (dans ce cas, la table des professeurs)
          key: 'id', // Nom de la colonne référencée (dans ce cas, l'ID du professeur)
        },
      },
});
Élève.belongsTo(Professeur, {
    foreignKey: 'professeurId',
    onDelete: 'CASCADE', // Optionnel : définir l'action à effectuer lors de la suppression du professeur associé
  });

  Professeur.hasMany(Élève, {
    foreignKey: 'professeurId',
  });

module.exports = Eleve;