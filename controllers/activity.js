
'use strict'
var mongoose = require('mongoose');
const activity = require('../models/activity');

function saveActivity(req, res){

    let param = req.body
   let mySave = new activity()
    mySave.active = true
    mySave.title = param.title
    mySave.rules = param.rules
    mySave.type = param.type
    mySave.points = param.points
    mySave.level = param.level
    mySave.extra = param.extra
    mySave.pillar = param.pillar
    mySave.duration = param.duration
    mySave.save((err, activeSaved) => {
        if(!err){
            res.status(200).send({actividad: activeSaved})
        }
    });
}


module.exports = {saveActivity}