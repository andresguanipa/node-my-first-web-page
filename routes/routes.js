const express = require('express');
const app = express();

app.get('/', (req, res) => {

    res.render('home', {
        name: 'andres gUANIpa',
        year: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {

    res.render('about', {
        year: new Date().getFullYear()
    });

});

app.get('/database', (req, res) => {
    res.send(products)
});

app.get('/contactanos', (req, res) => {

    res.render('contactanos');

});

const email = require('../servidor/email');

const oEmail = new email({
    "host": "smtp.gmail.com",
    "port": 465,
    "secure": true,
    "auth": {
        "user": "myspacevag1@gmail.com",
        "pass": process.env.pass,
    }

});

app.post('/contactanos', (req, res) => {

    let email = {
        from: "myspacevag1@gmail.com",
        to: "myspacevag1@gmail.com",
        subject: "Nuevo mensaje desde AV Shop",
        html: `
            <div>
                <p>Correo: ${req.body.email}</p>
                <p>Name: ${req.body.name}</p>
                <p>Text: ${req.body.text}</p> 
            </div>
        `
    }

    oEmail.sendEmail(email);
    res.send('OK');

});

module.exports = app;