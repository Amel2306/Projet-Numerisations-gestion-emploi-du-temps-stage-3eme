const Activite = require("../models/Activite")

//permet de déterminer un tableau des moments de l'activité
//le moment ou l'activité est possible est égale à 1, 0 sinon
async function momentsActivite(activiteId) {
    var moments = new Array(10);
    const activite = await Activite.findByPk(activiteId)

    if (!activite){
        console.log("cette activité n'existe pas")
        return null
    }

    moments[0] = activite.l1;
    moments[1] = activite.l2;
    moments[2] = activite.ma1;
    moments[3] = activite.ma2;
    moments[4] = activite.me1;
    moments[5] = activite.me2;
    moments[6] = activite.j1;
    moments[7] = activite.j2;
    moments[8] = activite.v1;
    moments[9] = activite.v2;

    return moments
}

module.exports = {
    momentsActivite,
}