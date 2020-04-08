'use strict'
var mongoose = require('mongoose');
const activityUser = require('../models/activityUser');
const activity = require('../models/activity');

function updateActivityUser(req, res){
    let params = req.body
    console.log(params)
    if(!params.isFavorite)
    params.isFavorite = false

    activityUser.findOneAndUpdate({"idUser": params.idUser, "activities._id" : params.activity }, {$set:{
        "activities.$.status": params.status,
        "activities.$.userAnswer": params.userAnswer,
        "activities.$.isFavorite": params.isFavorite}},{ 
        new: true
      }, function (err, active){
        if(err)
        res.status(500).send({message: err})
        else
        res.status(200).send({Activivdad: active})
    })
    
}
function getActivitiesHistory(req, res){
    let param = req.body
     activityUser.findOne({idUser: param.idUser}, async function (err, activityFound) { 
         if(err)      {
            res.status(500).send({message: err})
         }
           if(activityFound)      {
               
            let actividades = activityFound.activities.filter(x=> x.status != 0)
            res.status(200).send({actividades: actividades})
           }
     })
}


async function getActivityPerDay(req, res){
    let param = req.body
   //let busqueda = 
   let arr = []
   //activityUser.findOne({idUser: param.idUser, activities: { $elemMatch: { daily: (param.day + 1) } }}).exec((err, activityFound) =>{
       //.exec((err, activityFound) =>{
   //busqueda.populate('activities.activity').exec((err, activityFound) =>{
    activityUser.findOne({idUser: param.idUser}, async function (err, activityFound) {       
          if(activityFound)      {
              let actividades = activityFound.activities.filter(x=> x.daily === (param.day + 1))
              for(const act of actividades){
                
                activity.findById(act.activity, function (err, activitiFounder){
                    
                    arr.push(activitiFounder)
                    
                })
             }
              setTimeout(() => {
              console.log(arr)
              res.status(200).send({ actividades: arr})
            }, 1000);
              
          }
          else{
            res.status(400).send({message: 'No activities'})
          }
    })
    
}

function getResumeActivites(req, res){
    
    let param = req.body    
    let arr = []

     activityUser.findOne({idUser: param.idUser}, async function (err, activityFound) {       
           if(activityFound)      {
               let actividades = activityFound.activities.filter(x=> x.status === 2)
               arr = getActividades(actividades)
               res.status(200).send({ actividades: arr})
           }
     })    
}

async function getActividades(actividades){
    return new Promise((resolve, rejected) => {
        let arr = []
        
    })
}

function algo(){}


    module.exports = {updateActivityUser, getActivityPerDay, getActivitiesHistory}

