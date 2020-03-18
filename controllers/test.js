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
        let userActivities = new activityUser()
         userActivities.level = params.level
         userActivities.active = true
         userActivities.idUser = params.userId
         userActivities.idTest = params.encuestaId
         userActivities.dateStablished = ''
         for(const activityDay of resulsetReturn[0]){


            switch(activityDay.main){
                case 1:
                break;
                case 2:
                break;
                case 3:
                break;
                case 4:
                break;
            }

            userActivities.activities.push({status: 0, points : 0 }) ; 
         }
            res.status(200).send({result: arrResulset, activities: resulsetReturn[0], primer: resulsetReturn[1]})
           // res.status(200).send({ activities: arrActivities})
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