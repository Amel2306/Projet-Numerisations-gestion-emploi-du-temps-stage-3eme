const express = require('express');

//création de l'app
const app = express();

// les routes necessaires
const professeurRoutes = require('./routes/professeurRoutes');
const eleveRoutes = require('./routes/eleveRoutes');
const activiteRoutes = require ('./routes/activiteRoutes');
const parcoursRoutes = require('./routes/parcoursRoutes');
const activiteParcoursRoutes = require('./routes/activiteParcoursRoutes');
const questionRoutes = require ('./routes/questionsRoutes');
const reponseRoutes = require ('./routes/reponseRoutes')


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
app.use('/api/eleves', eleveRoutes);

//route activites
app.use('/api/activites', activiteRoutes);

//route parcours
app.use('/api/parcours', parcoursRoutes);

//route parcours activite 
app.use('/api/activiteparcours', activiteParcoursRoutes)

//route questions 
app.use('/api/questions', questionRoutes);

//route réponses
app.use('/api/reponses', reponseRoutes);

module.exports = app;