'use strict'

var expres = require('express');
var test = require('../controllers/userTest');
//var md_Auth = require('../midleware/autenticate');
var api = expres.Router();


api.post('/getuserTest', test.getuserTest);





module.exports = api;