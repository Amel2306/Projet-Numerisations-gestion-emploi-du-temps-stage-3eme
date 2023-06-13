const express = require('express');
const helmet = require('helmet');

const app = express();

const professeurRoutes = require('./routes/professeurRoutes');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json()); // Transforme les requêtes entrantes JSON en objet JS
app.use(express.urlencoded({ extended: true })); // Permet de lire les données des strings dans les requêtes entrantes

app.use('/api/professeurs', professeurRoutes);
module.exports = app;