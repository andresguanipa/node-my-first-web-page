const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'));

const hbs = require('hbs');
require('./hbs/helpers');


// Express HBS Engine
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


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

app.listen(3000, () => {
    console.log('Escuchando peticiones en el puerto 3000')
})