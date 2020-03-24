'use strict'
var express = require('express');
var bodyparser = require('body-parser');
var app = express();

var empresa_route = require('./Routes/empresa');
var encuesta_route = require('./Routes/encuesta');
var actividad_route = require('./Routes/actividad')
var actividadUser_route = require('./Routes/usuarioActividad')
var usuario_route = require('./Routes/usuario');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//configurar cabeceras http
app.use((req, res, next)=>{
res.header('Access-Control-Allow-Origin','*');
res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
next();
});

//rutas base

app.use('/api', empresa_route);
app.use('/api', encuesta_route);
app.use('/api', actividad_route);
app.use('/api', actividadUser_route);
app.use('/api', usuario_route);





module.exports = app;