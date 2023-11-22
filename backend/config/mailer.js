const nodemailer = require('nodemailer');

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {

        // mettre mail et mot de passe qui marche (ça ne marchait pas avec google re tester)
        user: 'email@exemple',
        pass: 'mdp@exemple'
    },
    tls:{
        rejectUnAuthorized:true
    }
};
var transporter = nodemailer.createTransport(smtpConfig);

module.exports = transporter;