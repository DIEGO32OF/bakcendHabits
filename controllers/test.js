'use strict'
var mongoose = require('mongoose');
const test = require('../models/test');
const activity = require('../models/activity');
const activityUser = require('../models/activityUser');
const task = require('../helpers/task');
const userTest = require('./userTest')


async function getScore(req, res){

    let params = req.body
    let arrResulset = new Array()
   
    arrResulset = await task.getResultSurvkey(params.questions)
    await userTest.updateAll(params.userId)
    userTest.saveUserTest(arrResulset, params.userId, params.encuestaId)

    activity.find({level: params.level, active: true}).exec(async(err,  activityFound)  =>  {
        if(err){

        }
        else if(activityFound){
         let resulsetReturn = await task.getActivities(arrResulset)
         let arrDayAct = []
         let connect = activityFound.filter(x => x.pillar == 1 &&  x.level == params.level)
         let activate = activityFound.filter(x => x.pillar == 2 &&  x.level == params.level)
         let relax = activityFound.filter(x => x.pillar == 3 &&  x.level == params.level)
         let eat = activityFound.filter(x => x.pillar == 4 &&  x.level == params.level)
         let wellnes = activityFound.filter(x => x.pillar == 5 &&  x.level == params.level)
        let userActivities = new activityUser()
         userActivities.level = params.level
         userActivities.active = true
         userActivities.idUser = params.userId
         userActivities.idTest = params.encuestaId         
         userActivities.dateStablished = ''
         let arrayIds = []
         let counterDay = 1
         for(const activityDay of resulsetReturn[0]){
            
        if( Object.keys(activityDay) != 'day'){
            switch(activityDay.main){
                case 1:
                    let siHubo = false
                    let activeConnect = connect[Math.floor(Math.random() * connect.length)]
                    if(!arrayIds.includes(activeConnect.id)){
                    arrayIds.push(activeConnect.id)
                    siHubo = true
                    }
                    else{
                      for(let intent = 0; intent < 4; intent ++)  {
                        activeConnect = connect[Math.floor(Math.random() * connect.length)]
                        if(!arrayIds.includes(activeConnect.id)){
                          arrayIds.push(activeConnect.id)
                          intent = 4
                          siHubo = true
                        }
                      }
                    }
                    if(siHubo)
                    {
                        userActivities.activities.push({status: 0, points : activeConnect.points, activity: activeConnect.id, userAnswer: '', day: activityDay.day, date: '', isFavorite: false, pillar:1, daily: counterDay, duration: activeConnect.duration }) ; 
                    }
                break;
                case 2:
                    let siHuboAc = false
                    let actividadActive = activate[Math.floor(Math.random() * activate.length)]
                    if(!arrayIds.includes(actividadActive.id)){
                    arrayIds.push(actividadActive.id)
                    siHuboAc = true
                    }
                    else{
                      for(let intent = 0; intent < 4; intent ++)  {
                        actividadActive = activate[Math.floor(Math.random() * activate.length)]
                        if(!arrayIds.includes(actividadActive.id)){
                          arrayIds.push(actividadActive.id)
                          intent = 4
                          siHuboAc = true
                        }
                      }
                    }
                    if(siHuboAc)
                    {
                        userActivities.activities.push({status: 0, points : actividadActive.points, activity: actividadActive.id, userAnswer: '', day: activityDay.day, date: '', isFavorite: false,  pillar:2, daily: counterDay, duration: actividadActive.duration }) ; 
                    }
                break;
                case 3:
                    let siHuboRe = false
                    let actividadRelax = relax[Math.floor(Math.random() * relax.length)]
                    if(!arrayIds.includes(actividadRelax.id)){
                    arrayIds.push(actividadRelax.id)
                    siHuboRe = true
                    }
                    else{
                      for(let intent = 0; intent < 4; intent ++)  {
                        actividadRelax = relax[Math.floor(Math.random() * relax.length)]
                        if(!arrayIds.includes(actividadRelax.id)){
                          arrayIds.push(actividadRelax.id)
                          intent = 4
                          siHuboRe = true
                        }
                      }
                    }
                    if(siHuboRe)
                    {
                        userActivities.activities.push({status: 0, points : actividadRelax.points, activity: actividadRelax.id, userAnswer: '', day: activityDay.day, date: '', isFavorite: false, pillar:3, daily: counterDay, duration: actividadRelax.duration }) ; 
                    }
                break;
                case 4:

                    let siHuboEa = false
                    let actividadEat = eat[Math.floor(Math.random() * eat.length)]
                    if(!arrayIds.includes(actividadEat.id)){
                    arrayIds.push(actividadEat.id)
                    siHuboEa = true
                    }
                    else{
                      for(let intent = 0; intent < 4; intent ++)  {
                        actividadEat = eat[Math.floor(Math.random() * eat.length)]
                        if(!arrayIds.includes(actividadEat.id)){
                          arrayIds.push(actividadEat.id)
                          intent = 4
                          siHuboEa = true
                        }
                      }
                    }
                    if(siHuboEa)
                    {
                        userActivities.activities.push({status: 0, points : actividadEat.points, activity: actividadEat.id, userAnswer: '', day: activityDay.day, date: '', isFavorite: false, pillar:4, daily: counterDay, duration: actividadEat.duration }) ; 
                    }

                break;

                case 5:

                    let siHuboWe = false
                    let actividadWell = wellnes[Math.floor(Math.random() * wellnes.length)]
                    if(!arrayIds.includes(actividadWell.id)){
                    arrayIds.push(actividadWell.id)
                    siHuboWe = true
                    }
                    else{
                      for(let intent = 0; intent < 4; intent ++)  {
                        actividadWell = wellnes[Math.floor(Math.random() * wellnes.length)]
                        if(!arrayIds.includes(actividadWell.id)){
                          arrayIds.push(actividadWell.id)
                          intent = 4
                          siHuboWe = true
                        }
                      }
                    }
                    if(siHuboWe)
                    {
                        userActivities.activities.push({status: 0, points : actividadWell.points, activity: actividadWell.id, userAnswer: '', day: activityDay.day, date: '', isFavorite: false, pillar:5, daily: counterDay, duration: actividadWell.duration }) ; 
                    }

                break;
            }

            switch(activityDay.second){
                case 1:
                    let siHubo = false
                    let activeConnect = connect[Math.floor(Math.random() * connect.length)]
                    if(!arrayIds.includes(activeConnect.id)){
                    arrayIds.push(activeConnect.id)
                    siHubo = true
                    }
                    else{
                      for(let intent = 0; intent < 4; intent ++)  {
                        activeConnect = connect[Math.floor(Math.random() * connect.length)]
                        if(!arrayIds.includes(activeConnect.id)){
                          arrayIds.push(activeConnect.id)
                          intent = 4
                          siHubo = true
                        }
                      }
                    }
                    if(siHubo)
                    {
                        userActivities.activities.push({status: 0, points : activeConnect.points, activity: activeConnect.id, userAnswer: '', day: activityDay.day, date: '', isFavorite: false, pillar:1, daily: counterDay, duration: activeConnect.duration }) ; 
                    }
                break;
                case 2:
                    let siHuboAc = false
                    let actividadActive = activate[Math.floor(Math.random() * activate.length)]
                    if(!arrayIds.includes(actividadActive.id)){
                    arrayIds.push(actividadActive.id)
                    siHuboAc = true
                    }
                    else{
                      for(let intent = 0; intent < 4; intent ++)  {
                        actividadActive = activate[Math.floor(Math.random() * activate.length)]
                        if(!arrayIds.includes(actividadActive.id)){
                          arrayIds.push(actividadActive.id)
                          intent = 4
                          siHuboAc = true
                        }
                      }
                    }
                    if(siHuboAc)
                    {
                        userActivities.activities.push({status: 0, points : actividadActive.points, activity: actividadActive.id, userAnswer: '', day: activityDay.day, date: '', isFavorite: false,  pillar:2, daily: counterDay, duration: actividadActive.duration }) ; 
                    }
                break;
                case 3:
                    let siHuboRe = false
                    let actividadRelax = relax[Math.floor(Math.random() * relax.length)]
                    if(!arrayIds.includes(actividadRelax.id)){
                    arrayIds.push(actividadRelax.id)
                    siHuboRe = true
                    }
                    else{
                      for(let intent = 0; intent < 4; intent ++)  {
                        actividadRelax = relax[Math.floor(Math.random() * relax.length)]
                        if(!arrayIds.includes(actividadRelax.id)){
                          arrayIds.push(actividadRelax.id)
                          intent = 4
                          siHuboRe = true
                        }
                      }
                    }
                    if(siHuboRe)
                    {
                        userActivities.activities.push({status: 0, points : actividadRelax.points, activity: actividadRelax.id, userAnswer: '', day: activityDay.day, date: '', isFavorite: false, pillar:3, daily: counterDay, duration: actividadRelax.duration }) ; 
                    }
                break;
                case 4:

                    let siHuboEa = false
                    let actividadEat = eat[Math.floor(Math.random() * eat.length)]
                    if(!arrayIds.includes(actividadEat.id)){
                    arrayIds.push(actividadEat.id)
                    siHuboEa = true
                    }
                    else{
                      for(let intent = 0; intent < 4; intent ++)  {
                        actividadEat = eat[Math.floor(Math.random() * eat.length)]
                        if(!arrayIds.includes(actividadEat.id)){
                          arrayIds.push(actividadEat.id)
                          intent = 4
                          siHuboEa = true
                        }
                      }
                    }
                    if(siHuboEa)
                    {
                        userActivities.activities.push({status: 0, points : actividadEat.points, activity: actividadEat.id, userAnswer: '', day: activityDay.day, date: '', isFavorite: false, pillar:4, daily: counterDay, duration: actividadEat.duration }) ; 
                    }

                break;

                case 5:

                    let siHuboWe = false
                    let actividadWell = wellnes[Math.floor(Math.random() * wellnes.length)]
                    if(!arrayIds.includes(actividadWell.id)){
                    arrayIds.push(actividadWell.id)
                    siHuboWe = true
                    }
                    else{
                      for(let intent = 0; intent < 4; intent ++)  {
                        actividadWell = wellnes[Math.floor(Math.random() * wellnes.length)]
                        if(!arrayIds.includes(actividadWell.id)){
                          arrayIds.push(actividadWell.id)
                          intent = 4
                          siHuboWe = true
                        }
                      }
                    }
                    if(siHuboWe)
                    {
                        userActivities.activities.push({status: 0, points : actividadWell.points, activity: actividadWell.id, userAnswer: '', day: activityDay.day, date: '', isFavorite: false, pillar:5, daily: counterDay, duration: actividadWell.duration }) ; 
                    }

                break;
            }

            switch(activityDay.suplenteT){
                case 1:
                    let siHubo = false
                    let activeConnect = connect[Math.floor(Math.random() * connect.length)]
                    if(!arrayIds.includes(activeConnect.id)){
                    arrayIds.push(activeConnect.id)
                    siHubo = true
                    }
                    else{
                      for(let intent = 0; intent < 4; intent ++)  {
                        activeConnect = connect[Math.floor(Math.random() * connect.length)]
                        if(!arrayIds.includes(activeConnect.id)){
                          arrayIds.push(activeConnect.id)
                          intent = 4
                          siHubo = true
                        }
                      }
                    }
                    if(siHubo)
                    {
                        userActivities.activities.push({status: 0, points : activeConnect.points, activity: activeConnect.id, userAnswer: '', day: activityDay.day, date: '', isFavorite: false, pillar:1, daily: counterDay, duration: activeConnect.duration }) ; 
                    }
                break;
                case 2:
                    let siHuboAc = false
                    let actividadActive = activate[Math.floor(Math.random() * activate.length)]
                    if(!arrayIds.includes(actividadActive.id)){
                    arrayIds.push(actividadActive.id)
                    siHuboAc = true
                    }
                    else{
                      for(let intent = 0; intent < 4; intent ++)  {
                        actividadActive = activate[Math.floor(Math.random() * activate.length)]
                        if(!arrayIds.includes(actividadActive.id)){
                          arrayIds.push(actividadActive.id)
                          intent = 4
                          siHuboAc = true
                        }
                      }
                    }
                    if(siHuboAc)
                    {
                        userActivities.activities.push({status: 0, points : actividadActive.points, activity: actividadActive.id, userAnswer: '', day: activityDay.day, date: '', isFavorite: false,  pillar:2, daily: counterDay, duration: actividadActive.duration }) ; 
                    }
                break;
                case 3:
                    let siHuboRe = false
                    let actividadRelax = relax[Math.floor(Math.random() * relax.length)]
                    if(!arrayIds.includes(actividadRelax.id)){
                    arrayIds.push(actividadRelax.id)
                    siHuboRe = true
                    }
                    else{
                      for(let intent = 0; intent < 4; intent ++)  {
                        actividadRelax = relax[Math.floor(Math.random() * relax.length)]
                        if(!arrayIds.includes(actividadRelax.id)){
                          arrayIds.push(actividadRelax.id)
                          intent = 4
                          siHuboRe = true
                        }
                      }
                    }
                    if(siHuboRe)
                    {
                        userActivities.activities.push({status: 0, points : actividadRelax.points, activity: actividadRelax.id, userAnswer: '', day: activityDay.day, date: '', isFavorite: false, pillar:3, daily: counterDay, duration: actividadRelax.duration }) ; 
                    }
                break;
                case 4:

                    let siHuboEa = false
                    let actividadEat = eat[Math.floor(Math.random() * eat.length)]
                    if(!arrayIds.includes(actividadEat.id)){
                    arrayIds.push(actividadEat.id)
                    siHuboEa = true
                    }
                    else{
                      for(let intent = 0; intent < 4; intent ++)  {
                        actividadEat = eat[Math.floor(Math.random() * eat.length)]
                        if(!arrayIds.includes(actividadEat.id)){
                          arrayIds.push(actividadEat.id)
                          intent = 4
                          siHuboEa = true
                        }
                      }
                    }
                    if(siHuboEa)
                    {
                        userActivities.activities.push({status: 0, points : actividadEat.points, activity: actividadEat.id, userAnswer: '', day: activityDay.day, date: '', isFavorite: false, pillar:4, daily: counterDay, duration: actividadEat.duration }) ; 
                    }

                break;

                case 5:

                    let siHuboWe = false
                    let actividadWell = wellnes[Math.floor(Math.random() * wellnes.length)]
                    if(!arrayIds.includes(actividadWell.id)){
                    arrayIds.push(actividadWell.id)
                    siHuboWe = true
                    }
                    else{
                      for(let intent = 0; intent < 4; intent ++)  {
                        actividadWell = wellnes[Math.floor(Math.random() * wellnes.length)]
                        if(!arrayIds.includes(actividadWell.id)){
                          arrayIds.push(actividadWell.id)
                          intent = 4
                          siHuboWe = true
                        }
                      }
                    }
                    if(siHuboWe)
                    {
                        userActivities.activities.push({status: 0, points : actividadWell.points, activity: actividadWell.id, userAnswer: '', day: activityDay.day, date: '', isFavorite: false, pillar:5, daily: counterDay, duration: actividadWell.duration }) ; 
                    }

                break;
            }

            counterDay++

            
        }
            
         }
         userActivities.save((err, userActivitiesSaved)=> {
             if(err)
             {
                res.status(500).send({message: err})
             }
             else
            res.status(200).send({result: arrResulset, activities: resulsetReturn[0], primer: resulsetReturn[1], ActividadesResult: userActivitiesSaved })
           // res.status(200).send({ activities: arrActivities})
        })
        }
        
    })
}



function getTest(req, res){

    let params = req.body
    switch (params.type){
        case 'id':
            test.findById(params.id,  function (err, testFound) {
                if(err){
                    res.status(500).send({message: `Error: ${err}`})
                }
                else if(testFound){
                    res.status(200).send({test: testFound})
                }
            })
            break;
        case 'tipo':
            test.find({ active: true, type: params.id }).exec((err, testFound) => {
                if(err){
                    res.status(500).send({message: `Error: ${err}`})
                }
                else if(testFound){
                    res.status(200).send({test: testFound})
                }
             })
            break;
    }
}

function saveTest(req, res){

  let params = req.body
  
  test.findOne({name: params.name},(err, myTestFound) =>{
    if(myTestFound){
        res.status(200).send({message: 'Evaluación ya existente'})
    }
    else{
        let testToSave = new test()
        testToSave.name = params.name
        testToSave.description = params.description
        testToSave.level = params.level
        testToSave.active = true
        testToSave.type = params.type
        for( const question of params.questions ){
        testToSave.question.push({ points: question.points, text: question.text, pillar: question.pillar,
          html: question.html, max: question.max, min: question.min  })
        }
        testToSave.save((err, testSaved) => {
            if(err){
                res.status(500).send({message: `Error: ${err}`})
            }
            else if(testSaved){
            res.status(200).send({test: testSaved})
            }
        })
    }    
  })
}

module.exports = {saveTest, getTest, getScore}