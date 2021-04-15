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

const { products } = require('./db/db');


app.use(require('./routes/routes'));


app.listen(process.env.PORT, () => {
    console.log(`Escuchando peticiones en el puerto ${process.env.PORT}`)
})