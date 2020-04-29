
'use strict'

var expres = require('express');
var user = require('../controllers/user');
//var md_Auth = require('../midleware/autenticate');
var api = expres.Router();


api.post('/saveUser', user.saveUser);
api.post('/updateProperties', user.updateProperties);
api.post('/getPointsRacha', user.getPointsRacha);
api.post('/updateUser', user.updateUser);




module.exports = api;