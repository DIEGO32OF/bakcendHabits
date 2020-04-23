'use strict'
var mongoose = require('mongoose');
const activityUser = require('../models/activityUser');
const activity = require('../models/activity');
const axios = require('axios');

function updateActivityUser(req, res){
    let params = req.body
    
    if(!params.isFavorite)
    params.isFavorite = false
    
    if(params.userAnswer != undefined){
     let userAnswerRe  = params.userAnswer
    
    params.userAnswer = userAnswerRe.replace(/"/g, "'")   
    } 

    let arrKeys = '{'+ Object.keys(params).map(x => 
        '"activities.$.'+x+ '": ' +   '"'+params[x]+'"' )
    .filter(f => f.includes('status') || f.includes('userAnswer') || f.includes('isFavorite')|| f.includes('date') )
    .reduce((a, b) => a +", "+ b, "").replace(',', '')+' }'
    
let query = JSON.parse(arrKeys)
        
    activityUser.findOneAndUpdate({"idUser": params.idUser, "activities._id" : params.activity }, {$set:
        query },{ 
        new: true
      }, function (err, active){
        if(err)
        res.status(500).send({message: err})
        else{

            if(params.uid){
                let actividad = active.activities.filter(x => x._id == params.activity)
                            
            activity.findById(actividad[0].activity, function (err, activitiFounder){                  
            const config = {
                headers: { Authorization: 'Bearer 400853ac-af63-4436-bdf8-9eea7494659d' }
            };
            
            const bodyParameters = {
                "user_activity":{
                    "title":activitiFounder.title,
                    "rules": activitiFounder.rules,
                    "status": params.status,
                    "points": activitiFounder.points,
                    "type": activitiFounder.type,
                    "uid":params.uid
                }
            
            };
            
            axios.post( 
              'https://us-central1-habits-ai.cloudfunctions.net/app/addPointUserActivitysFromRemote',
              bodyParameters,
              config
            ).then(resultset => {
                if(resultset.data.code)
                res.status(200).send({ code: resultset.data.code, message: resultset.data.message }) 
                else
                res.status(200).send(resultset.data) 
            }).catch(console.log);
        })

        }
        else   
            res.status(200).send({message: 'Actualizado ok'})
        }
        
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
              
            
              })
            }

        }

              setTimeout(() => {        
               /*  console.log( arrayResult.act.date)
                        */
                       arrayResult = arrayResult.sort(function (a, b) { return a.act.daily - b.act.daily });
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
            let favorite = activityFound.activities.filter(x=> x.isFavorite)
            
            let arr = []
            let counter = 0
            let arrFavorite = []
            let counterF = 0
            let total = actividades.length
            let totalFavorites = favorite.length
            
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

             for(const fav of favorite){
                
                if(counterF >= min && counterF <= max){
                activity.findById(fav.activity, function (err, activitiFounder){
                    
                   let resume = { fav, actividad:activitiFounder }                
                   arrFavorite.push(resume)
                    
                })
            }
                counterF ++
             }

              setTimeout(() => {   
                arrFavorite=arrFavorite.sort(function (a, b) { return b.fav.date.replace(/-/g,'').replace(/:/g,'').replace('T','') - a.fav.date.replace(/-/g,'').replace(/:/g,'').replace('T','') }); 
                arr = arr.sort(function (a, b) { return b.act.date.replace(/-/g,'').replace(/:/g,'').replace('T','') - a.act.date.replace(/-/g,'').replace(/:/g,'').replace('T','') });             
              res.status(200).send({ actividades: arr, total: total, totalF: totalFavorites, favorito: arrFavorite })
            }, 1800);
           // res.status(200).send({actividades: actividades})
           }
     })
}

function getLogros(req, res)
{
    let param = req.body
    activityUser.findOne({idUser: param.idUser}, async function (err, activityFound) {       
        if(activityFound)      {
            let actividades = activityFound.activities.filter(x=> x.daily === (param.day + 1) && x.status == 2)
            let point = actividades.map(x=> x.points).reduce((a, b) => a + b, 0)
            let duration = actividades.map(x=> x.duration).map(numStr => parseInt(numStr)).reduce((a, b) => a + b, 0)
            //console.log(point, duration, actividades)
            res.status(200).send({puntos: point, duracion: duration, actividades: actividades})
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
                    if(act.status != 0)                 
                    arr.push({activitiFounder, status: act.status, date: act.date, userAnswer: act.userAnswer, isFavorite:act.isFavorite})
                    else
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


    module.exports = {updateActivityUser, getActivityPerDay, getActivitiesHistory, getActivitiesToReview,
        getLogros}

