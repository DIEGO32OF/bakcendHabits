
'use strict'
var mongoose = require('mongoose');
const activity = require('../models/activity');

function saveActivity(req, res){

    let param = req.body
    console.log(param)
    let arraySaved = []
    for( const actividad of param){
   let mySave = new activity()
    mySave.active = true
    mySave.title = actividad.title
    mySave.rules = actividad.rules
    mySave.type = actividad.type
    mySave.points = actividad.points
    mySave.level = actividad.level
    mySave.extra = actividad.extra
    mySave.pillar = actividad.pillar
    mySave.duration = actividad.duration
    mySave.save((err, activeSaved) => {
        if(!err){
            arraySaved.push(activeSaved)   
        }
    });
}
res.status(200).send({actividad: arraySaved})

}




module.exports = {saveActivity}