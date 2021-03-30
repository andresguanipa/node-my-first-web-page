require('./config');
const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'));

const hbs = require('hbs');
require('./hbs/helpers');

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
        "user": "myspacevag1@gmail.com",
        "pass": "qltuaabucmzguwcj",
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

app.post('/contactanos', (req, res) => {

    let email = {
        from: "myspacevag1@gmail.com",
        to: req.body.email,
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


app.listen(process.env.PORT, () => {
    console.log(`Escuchando peticiones en el puerto ${process.env.PORT}`)
})