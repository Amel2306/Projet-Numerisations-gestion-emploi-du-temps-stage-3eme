const Activite = require("../models/Activite")

//permet de déterminer un tableau des moments de l'activité
//le moment ou l'activité est possible est égale à 1, 0 sinon
async function moments_activite(activiteId) {
    var moments = new Array(10);
    const activite = await Activite.findByPk(activiteId)

    if (!activite){
        console.log("cette activité n'existe pas")
        return null
    }

    moments[0] = Activite.l1;
    moments[1] = Activite.l2;
    moments[2] = Activite.ma1;
    moments[3] = Activite.ma2;
    moments[4] = Activite.me1;
    moments[5] = Activite.me2;
    moments[6] = Activite.j1;
    moments[7] = Activite.j2;
    moments[8] = Activite.v1;
    moments[9] = Activite.v2;

    return moments
}

module.exports = {
    moments_activite,
}