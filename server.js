const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'));

const hbs = require('hbs');
require('./hbs/helpers');

const port = process.env.PORT || 3000;

// Express HBS Engine
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

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

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`)
})