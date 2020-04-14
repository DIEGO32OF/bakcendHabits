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
        "activities.$.date": params.date,
        "activities.$.isFavorite": params.isFavorite}},{ 
        new: true
      }, function (err, active){
        if(err)
        res.status(500).send({message: err})
        else
        res.status(200).send({Activivdad: active})
    })
    
}

function getActivitiesToReview(req, res){
    let param = req.body
    activityUser.find({'activities.status': 1}, async function (err, activityFound) { 
        if(err)      {
           res.status(500).send({message: err})
        }
          if(activityFound)      { 
            
              let arrayResult = []              
              for(const active of activityFound){
                
            let actividades = active.activities.filter(x=> x.status == 1 )
            for(const act of actividades){
                                
                activity.findById(act.activity, function (err, activitiFounder){
            arrayResult.push({act, actividad: activitiFounder, id: active.id, level: active.level, idUser: active.idUser})
             // console.log( arrayResult)
              })
            }

        }

              setTimeout(() => {              
                res.status(200).send({ actividadesReview: arrayResult})
              }, 1000);
          }
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
            let arr = []
            let counter = 0
            let total = actividades.length
            let max = param.page *20
            let min = max - 20
            for(const act of actividades){
                
                if(counter >= min && counter <= max){
                activity.findById(act.activity, function (err, activitiFounder){
                    
                   let resume = { act, actividad:activitiFounder }                
                    arr.push(resume)
                    
                })
            }
                counter ++
             }
              setTimeout(() => {              
              res.status(200).send({ actividades: arr, total: total})
            }, 1000);
           // res.status(200).send({actividades: actividades})
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
                    activitiFounder._id = act._id                    
                    arr.push({activitiFounder, status: act.status})
                    
                })
             }
              setTimeout(() => {              
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


    module.exports = {updateActivityUser, getActivityPerDay, getActivitiesHistory, getActivitiesToReview}

