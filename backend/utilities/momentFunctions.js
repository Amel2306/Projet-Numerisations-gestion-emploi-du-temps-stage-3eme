const Moment = require ("../models/classes/Moment");
const Activite = require ("../models/Activite");
const {moments_activite} = require ("./activitesFunctions");


function minMom(ar_m) {
    let min_mom = 0;
    let min_nb_act = ar_m[0].occupeParcours();
    for (let i = 1; i < ar_m.length; i++) {
      const m = ar_m[i];
      if (m.occupeParcours() < min_nb_act) {
        min_mom = i;
        min_nb_act = m.occupeParcours();
      }
    }
    return min_mom;
}

async function activiteByMoment () {
    //création de tous les moments
    var tableau_moments = new Array(10);

    for (let i = 0; i<10; i++) {
        var moment = new Moment();
        tableau_moments[i] = moment
    }

    const activites = await Activite.findAll();
    for (act of activites) {
        let nb_realisations = act.nb_realisations;
        while (nb_realisations !== 0) {
            let momentOfAct = moments_activite(act.id)
            let idMinMom = minMom(momentOfAct)
            tableau_moments[idMinMom].addActivite(act.id, act.nb_eleve_max)
            momentOfAct[idMinMom] = 0;
            nb_realisations--;
        }
    }
    return tableau_moments
}

module.exports = {
    activiteByMoment,
}