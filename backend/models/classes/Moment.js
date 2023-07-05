
class Moment {
    constructor(nb_eleve_max) {
      this.nb_eleve_max = nb_eleve_max
      this.activite_dispo = new Map();
    }
  
    //on ajoute id de l'activité et nb_eleve_max de l'activité
    addActivite(activite, dispo) {
      this.activite_dispo.set(activite, dispo);
    }
  
    giveActivite(parc) {
      let activitePrise = null;
      for (const [activite, dispo] of this.activite_dispo) {
        let found = false;
        for (const  act of parc) {
          if (act !== null && act === activite) {
            found = true;
            break;
          }
        }
        if (!found) {
          activitePrise = activite;
          const valeurActuelle = this.activite_dispo.get(activitePrise);
          if (valeurActuelle !== undefined && valeurActuelle >= this.nb_eleve_max) {
            this.activite_dispo.set(activitePrise, valeurActuelle - this.nb_eleve_max);
          }
          if (this.activite_dispo.get(activitePrise) < this.nb_eleve_max) {
            this.activite_dispo.delete(activitePrise);
            break;
          }
        }
      }
      return activitePrise;
    }
  
    isEmpty() {
      return this.activite_dispo.size === 0;
    }
    
    occupeParcours() {
      let nbRetour = 0;
      for (const dispo of this.activite_dispo.values()) {
        nbRetour += dispo;
      }
      return nbRetour;
    }
  }
  
  module.exports = Moment;