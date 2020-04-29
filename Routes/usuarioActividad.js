
'use strict'

var expres = require('express');
var activityUser = require('../controllers/activityUser');
//var md_Auth = require('../midleware/autenticate');
var api = expres.Router();


api.post('/updateActivityUser', activityUser.updateActivityUser);
api.post('/getActivityUser', activityUser.getActivityPerDay);
api.post('/getActivitiesHistory', activityUser.getActivitiesHistory);
api.post('/getActivitiesToReview', activityUser.getActivitiesToReview);
api.post('/getLogros', activityUser.getLogros);
api.post('/getActivitiesReport', activityUser.getActivitiesReport);






module.exports = api;