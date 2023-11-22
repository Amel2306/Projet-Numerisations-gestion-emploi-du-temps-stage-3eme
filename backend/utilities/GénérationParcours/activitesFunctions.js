const Activite = require("../../models/Activite");

// compte le nombre de fois ou l'activité n'est pas dispo dans la semaine
// si elle n'est plus disponible dans aucun moment alors compt === 0
function compteZero(ar_m) {
  let compt = 0;
  for (let i = 0; i < ar_m.length; i++) {
    if (ar_m[i] === 0) {
      compt += 1;
    }
  }
  return compt;
}

//prend en paramètre une activiteID
//permet de déterminer un tableau des moments de l'activité
//le moment ou l'activité est possible est égale à 1, 0 sinon
//retourne le tableau en question de taille 10
async function momentsActivite(activiteId) {
  var moments = new Array(10);
  const activite = await Activite.findByPk(activiteId);

  if (!activite) {
    console.log("cette activité n'existe pas");
    return null;
  }

  moments[0] = parseInt(activite.l1);
  moments[1] = parseInt(activite.l2);
  moments[2] = parseInt(activite.ma1);
  moments[3] = parseInt(activite.ma2);
  moments[4] = parseInt(activite.me1);
  moments[5] = parseInt(activite.me2);
  moments[6] = parseInt(activite.j1);
  moments[7] = parseInt(activite.j2);
  moments[8] = parseInt(activite.v1);
  moments[9] = parseInt(activite.v2);

  return moments;
}

// tab_activite : tableau de toutes les activités disponibles
//retourne tableau d'objet {activite, nbrZero, momentActivite} trié en fonction de nbrZero
async function triActivite(tab_activite) {
  // tableau qui va stocker des objet {activite, nbrZero, momentActivite}
  const tab_tri_activite = new Array(tab_activite.length);

  // on crée les objet dans le tableau
  for (let i = 0; i < tab_activite.length; i++) {
    const moment_act = await momentsActivite(tab_activite[i].id);
    const new_obj = {
      activite: tab_activite[i],
      nbrZero: compteZero(moment_act),
      momentsActivite: moment_act,
    };

    tab_tri_activite[i] = new_obj;
  }

  // on trie les activité en fonction de leur nbrZero (ceux ayant le plus de 0 se retrouvent en début de tableau)
  for (let i = 0; i < tab_tri_activite.length; i++) {
    let element_courant = tab_tri_activite[i];
    let j = i - 1;

    while (j >= 0 && tab_tri_activite[j].nbrZero < element_courant.nbrZero) {
      tab_tri_activite[j + 1] = tab_tri_activite[j];
      j--;
    }

    tab_tri_activite[j + 1] = element_courant;
  }

  //on retourne le tableau trié
  return tab_tri_activite;
}

module.exports = {
  compteZero,
  momentsActivite,
  triActivite,
};
