'use strict'

var expres = require('express');
var test = require('../controllers/test');
//var md_Auth = require('../midleware/autenticate');
var api = expres.Router();


api.post('/saveTest', test.saveTest);
api.post('/getTest', test.getTest);
api.post('/getScore', test.getScore);




module.exports = api;