'use strict'

var expres = require('express');
var company = require('../controllers/company');
//var md_Auth = require('../midleware/autenticate');
var api = expres.Router();


api.post('/saveCompany', company.saveCompany);
api.post('/updateCompany', company.updateCompany);
api.post('/getCompany', company.getCompany);



module.exports = api;