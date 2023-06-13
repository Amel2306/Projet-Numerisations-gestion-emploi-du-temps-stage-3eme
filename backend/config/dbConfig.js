const { Sequelize } = require('sequelize');

const url_db = process.env.DATABASE_URL || "mysql://amel:mdp@localhost:3306/projet_stage";

const sequelize = new Sequelize(url_db)

module.exports = sequelize;