// Invocaciones de librerias de Java Script
const express =require('express');
const { json } = require('express/lib/response');
const app =express();
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");



//Invocacion de la libreria para visualizar las vistas
app.set('view engine', 'ejs');

//Invaciones para el funcion de la pagina en el caso de expresses para hacer una conexion con el navegador
//Static visualizar las rutas estaticas
//Require es par la conexion de la base de datos 
// Seccion para abrir o cerrar seccion de los usuarios
app.use(express.urlencoded({extended:false}));
app.use(express(json));
app.use( express.static("views") );
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));
app.use('/', require('./router'));
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}));


//app.use(express.static(path.join(__dirname, '/views')))





//Para construir la direccion donde se va crear la pagina web.
app.listen(5000, ()=>{
    console.log('Server corriendo en http://localhost:5000');
})