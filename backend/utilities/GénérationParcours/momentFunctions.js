const Moment = require("../../models/classes/Moment");
const Activite = require("../../models/Activite");
const {
  compteZero,
  momentsActivite,
  triActivite,
} = require("./activitesFunctions");

/*
Les Moments : sont indexé de 0 à 9 en fonction de leur période dans le semaine 
ainsi lundi matin = 0, lundi aprés-midi = 1...
*/

//prend en paramètre le tableau des disponibilité d'une activité et le tableau des moments généraux
//permet de déterminer le moment ou il a le moins d'activité pour permettre de créer des parcours plein
//retourn l'indice du moment ayant le plus besoin d'activtié
function minMom(ar_m, tableau_moments) {
  let min_mom = -1;
  let min_nb_act = Infinity; // on sait qu'il y aura toujours - d'activité;

  for (let i = 0; i < tableau_moments.length; i++) {
    if (ar_m[i] === 1) {
      const m = tableau_moments[i];
      if (min_mom === -1 || m.occupeParcours() < min_nb_act) {
        min_mom = i;
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
async function activiteByMoment(nb_eleve_max) {
  //création de tous les moments
  var tableau_moments = new Array(10);

  for (let i = 0; i < 10; i++) {
    var moment = new Moment(nb_eleve_max);
    tableau_moments[i] = moment;
  }

  const activites = await Activite.findAll();

  // ajouter fonction tri activités

  const activites_triees = await triActivite(activites);

  for (let i = 0; i < activites_triees.length; i++) {
    let act = activites_triees[i];
    console.log(act);
    let nb_realisations = act.activite.nb_realisations;

    //détermination du tableau de moment de chaque activite (le moments ou l'activité peut être réalisée)
    let moment_of_act = act.momentsActivite;

    let compt = act.nbrZero; // le nombre de fois dans la semaine ou l'activité n'est pas dispo

    while (
      nb_realisations !== 0 &&
      act.activite.nb_eleve_max >= nb_eleve_max &&
      compt < 10
    ) {
      let id_min_mom = minMom(moment_of_act, tableau_moments);

      if (id_min_mom !== -1) {
        //ajoute l'activité dans le moment qui en a le plus besoin (=> a le moins d'occupation)
        tableau_moments[id_min_mom].addActivite(
          act.activite.id,
          act.activite.nb_eleve_max
        );

        moment_of_act[id_min_mom] = 0;
        nb_realisations--;
        compt += 1;
      }
    }
  }
  return tableau_moments;
}

module.exports = {
  activiteByMoment,
  minMom,
};
