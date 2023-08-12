const nodemailer = require('nodemailer');
const i18n = require('i18n');
const {
    BNB_ADDRESS,
    COIN_AMOUNT,
    ADMIN_GAS_PRICE,
    ADMIN_GAS_LIMIT,
    HOST,
    DB_USER,
    DB_PASS,
    DB_DATABASE,
    PORT,
    SECRET_JWT,
    EMAIL_HOST,
    EMAIL_SERVICE,
    EMAIL,
    EMAIL_PWD,
    FRONT_URL,
    COINMARKET_APIKEY
}= require('../utils/constants');
i18n.configure({
    locales: ['En', 'Mn'],
    directory: __dirname + '/locales',
    defaultLocale: 'En',
})

module.exports = {
    deliverEmail: function (dest, subject, body) {
        var transport = nodemailer.createTransport({
            service: EMAIL_SERVICE,
            //host: process.env.EMAIL_HOST,
            sendmail: true,
			secure: false,
			port: 995,
            auth: {
                //user: process.env.EMAIL_USER,
                user: EMAIL,
                pass: EMAIL_PWD
            }
        });
        var mailOptions = {
            from: EMAIL,
            to: dest,
            subject: subject,
            text: body,
        };
        console.log(subject, body);
        transport.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }   
}