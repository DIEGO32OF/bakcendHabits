'use strict'

var expres = require('express');
var activity = require('../controllers/activity');
//var md_Auth = require('../midleware/autenticate');
var api = expres.Router();


api.post('/saveActivity', activity.saveActivity);
api.post('/loadExcel', activity.loadExcel);



module.exports = api;