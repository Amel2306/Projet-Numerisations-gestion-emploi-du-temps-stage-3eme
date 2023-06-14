const { DataTypes } = require('sequelize');
const db = require('../config/dbConfig');

const Parcours = db.define('Parcours', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

module.exports = Parcours;