const express = require('express');

//création de l'app
const app = express();

// les routes necessaires
const professeurRoutes = require('./routes/professeurRoutes');
const eleveRoutes = require('./routes/eleveRoutes');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json()); // Transforme les requêtes entrantes JSON en objet JS
app.use(express.urlencoded({ extended: true })); // Permet de lire les données des strings dans les requêtes entrantes

//route professeurs
app.use('/api/professeurs', professeurRoutes);

//routes eleves
app.use


app.use('/api/eleves', eleveRoutes);
module.exports = app;