const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'));

const hbs = require('hbs');
require('./hbs/helpers');

const port = process.env.PORT || 3000;

// Express HBS Engine
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

const bodyParse = require('body-parser');


app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

const email = require('./servidor/email');

const oEmail = new email({
    "host": "smtp.gmail.com",
    "port": 465,
    "secure": true,
    "auth": {
        "user": "andreseguanipa1@gmail.com",
        "pass": "ijvaaqjwnajaxsbb",
    }

});

const { products } = require('./db/db');

app.get('/', (req, res) => {

    res.render('home', {
        name: 'andres gUANIpa',
        year: new Date().getFullYear()
    });
})

app.get('/about', (req, res) => {

    res.render('about', {
        year: new Date().getFullYear()
    });

})

app.get('/database', (req, res) => {
    res.send(products)
})

app.get('/contactanos', (req, res) => {

    res.render('contactanos');

})

app.post('/contactanos', (req, res, next) => {

    let email = {
        from: "andreseguanipa1@gmail.com",
        to: "andreseguanipa1@gmail.com",
        subject: "Nuevo mensaje",
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


app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`)
})