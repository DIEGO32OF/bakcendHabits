'use strict'
var mongoose = require('mongoose');
const activityUser = require('../models/activityUser');

function updateActivityUser(req, res){
    let params = req.body
    activityUser.findOne({ activities: { $elemMatch: { activity: params.id } } }).exec((err, Searching) => {
        console.log(Searching)
    })
    
}
function getActivityPerDay(req, res){
    let param = req.body
    activityUser.findOne({idUser: param.idUser, activities: {$elemMatch: {day: param.day}}}).exec((err, activityFound) =>{
                
    })
}

module.exports = {updateActivityUser, getActivityPerDay}

