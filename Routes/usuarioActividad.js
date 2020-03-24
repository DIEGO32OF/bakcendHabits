
'use strict'

var expres = require('express');
var activityUser = require('../controllers/activityUser');
//var md_Auth = require('../midleware/autenticate');
var api = expres.Router();


api.post('/updateActivityUser', activityUser.updateActivityUser);
api.post('/getActivityUser', activityUser.getActivityPerDay);


module.exports = api;