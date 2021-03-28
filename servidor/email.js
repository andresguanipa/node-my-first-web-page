const nodemailer = require("nodemailer");

class Email {

    constructor(oConfig) {
        this.createTransport = nodemailer.createTransport(oConfig);
    }

    sendEmail(oEmail) {
        try {

            this.createTransport.sendMail(oEmail, (err, info) => {

                if (err) {
                    console.log('Error al enviar el E-mail');

                } else {
                    console.log('Correo enviado correctamente');
                }

                this.createTransport.close();

            })

        } catch (e) {
            console.log("Email.enviarCorreo -- Error -- " + e);
        }
    }

}

module.exports = Email;