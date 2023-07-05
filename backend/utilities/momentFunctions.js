const Moment = require ("../models/classes/Moment");
const Activite = require ("../models/Activite");
const {momentsActivite} = require ("./activitesFunctions");

/*
Les Moments : sont indexé de 0 à 9 en fonction de leur période dans le semaine 
ainsi lundi matin = 0, lundi aprés-midi = 1...
*/


//prend en paramètre le tableau des disponibilité d'une activité et le tableau des moments généraux 
//permet de déterminer le moment ou il a le moins d'activité pour permettre de créer des parcours plein
//retourn l'indice du moment ayant le plus besoin d'activtié
function minMom(ar_m, tableau_moments) {

    //va stocker index du moment
    let min_mom = null
    let min_nb_act = null
    for (let i = 0; i < ar_m.length; i++) {
        //le cas ou l'activité est dispo à ce moment
        if (ar_m[i] === 1) {
            //détermine le min des moment
            const m = tableau_moments[i];
            if (min_mom !== null) {
                if (m.occupeParcours() < min_nb_act) {
                    min_mom = i;
                    min_nb_act = m.occupeParcours();
                }
            }
            // dans le cas ou avant ça min_mom est null on attribue l'activité au premier moment car on ne peut faire de comparaison
            else {
                min_mom = i
                min_nb_act = m.occupeParcours();
            }
        }
    }
    return min_mom;
}

//prend en paramètre le nombre maximum d'élève dans un groupe
//permet d'attribué une activité à un moment précis 
//en prenant en compte le fait qu'elle ne peut apparaitre dans un même moment 
//si ce n'est en ayant moins d"élèves que le nb_eleve_max
async function activiteByMoment (nb_eleve_max) {

    //création de tous les moments
    var tableau_moments = new Array(10);

    for (let i = 0; i<10; i++) {
        var moment = new Moment(nb_eleve_max);
        tableau_moments[i] = moment
    }

    const activites = await Activite.findAll();
    for (act of activites) {
        let nb_realisations = act.nb_realisations;

        //détermination du tableau de moment de chaque activite
        let moment_of_act = await momentsActivite(act.id)
        console.log(moment_of_act);
        while (nb_realisations !== 0 && act.nb_eleve_max >= nb_eleve_max) {
            let id_min_mom = minMom(moment_of_act, tableau_moments)
            tableau_moments[id_min_mom].addActivite(act.id, act.nb_eleve_max)
            moment_of_act[id_min_mom] = 0;
            nb_realisations--;
        }
    }
    return tableau_moments
}

module.exports = {
    activiteByMoment,
    minMom
  };