const express = require('express');
const exphbs = require("express-handlebars");
const app = express();

let arr = [
    {
        name: 'Monitor',
        price: 40
    }
]
// 
app.set("views", "./views");
app.set("view engine", "hbs");

// Configuración de la plantilla
app.engine(
    'hbs',
    exphbs({
        extname: 'hbs',
        layoutsDir: __dirname + '/views/layouts',
        defaultLayout: 'index',
        partialsDir: __dirname + '/views/partials'
    })
)

// Rutas
app.get('/', (req, res) => {
    res.render('main');
});
app.get('/productos', (req, res) => {
    res.render('productos', {layout: 'home', data: arr});

});
app.listen(8080, () => {
    console.log("Server running");
});
