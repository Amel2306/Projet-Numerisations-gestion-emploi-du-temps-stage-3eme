const { DataTypes } = require("sequelize");
const db = require("../config/dbConfig");

const Professeur = db.define("Professeur", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numero_tel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  metier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  etablissement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM,
    values: ["Tuteur", "Encadrant", "Encadrant et Tuteur", "Admin"],
    allowNull: false,
  },
  nb_eleve_tuteur: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Professeur;
