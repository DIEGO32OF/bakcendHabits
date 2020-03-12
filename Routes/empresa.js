'use strict'

var expres = require('express');
var company = require('../controllers/company');
//var md_Auth = require('../midleware/autenticate');
var api = expres.Router();


api.post('/saveCompany', company.saveCompany);


module.exports = api;