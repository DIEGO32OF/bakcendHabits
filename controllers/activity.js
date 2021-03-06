
'use strict'
var mongoose = require('mongoose');
const activity = require('../models/activity');
const readXlsxFile = require('read-excel-file/node');

function loadExcel(req, res){
    readXlsxFile('./controllers/excelin1.xlsx').then((rows) => {
        // `rows` is an array of rows
        // each row being an array of cells.
        let arraySaved = []
        for(const row of rows){
          //  console.log('titulo', row[1],'---', 'rules', row[2], '---', 'type', row[3],'---', 'points',row[4], '---', 'level', row[5], '---', 'extra', row[6], '---', 'pilar',row[7], '---', 'duracion',row[8])
            let mySave = new activity()
            mySave.active = true
            mySave.title = row[1]
            mySave.rules = row[2]
            mySave.type = row[3]
            mySave.points = row[4]
            mySave.level = row[5]
            mySave.extra = row[6]
            /* let pilar = 0
            switch (row[7]){
                case 'C':
                    pilar = 1
                    break;
                    case 'A':
                    pilar = 2
                    break;
                    case 'R':
                    pilar = 3
                    break;
                    case 'E':
                    pilar = 4
                    break;
                    case 'WW':
                        pilar = 5
                        break;

            } */
            mySave.pillar = row[7]
            mySave.duration = row[8]
            mySave.textarea = row[9]
            mySave.text = row[10]
            let arrayOption = []
            if(row[10] != '.'){
                arrayOption.push(row[11], row[12], row[13])
                mySave.opciones = arrayOption
                mySave.correct_answer = row[13]
            }
             mySave.save((err, activeSaved) => {
                if(!err){
                    arraySaved.push(activeSaved)   
                }
            }); 
        }
        res.status(200).send({excel: rows})
      })
}



function saveActivityFor(req, res){

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

function getActivity(req, res){

}

function getActivities(req, res){
    let param = req.body    
    let arr = []

    activity.find({}, async function (err, activityFound) {       
           if(activityFound)      {
               res.status(200).send({ actividades: activityFound})
           }
     })
}


function updateActivity(req, res){

    let paramers = req.body
    let idActivity = paramers.idActivity
                    
        let updateQuery = {};
        updateQuery = paramers
        activity.findOneAndUpdate({_id: idActivity}, {$set: updateQuery}, {new: true}, (err, respuesta) => {
        if (err) {
            res.status(500).send({message: err})
        } else {
      
      res.status(200).send({actividad: respuesta})
        }
      })
}


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
    mySave.textarea = param.textarea
    mySave.lines = param.lines
    mySave.save((err, activeSaved) => {
        if(!err){
            res.status(200).send({actividad: activeSaved})
        }
    });



}



module.exports = {saveActivity, loadExcel, saveActivityFor, updateActivity, getActivities}