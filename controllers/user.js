'use strict'
var mongoose = require('mongoose');
const user = require('../models/user');


function saveUser(req, res){

    let params = req.body    
    let saveUser = new user()
    saveUser.wellness = params.wellness
    saveUser.tester = params.tester
    saveUser.steps_goal = params.steps_goal
    saveUser.seven_days = params.seven_days
    saveUser.status = params.status
    saveUser.rol = params.rol
    saveUser.points = params.point
    saveUser.picture = params.picture
    saveUser.old_week = params.old_week
    saveUser.name_first = params.name_first
    saveUser.name = params.name
    saveUser.mail = params.mail
    saveUser.last_name_first = params.last_name_first
    saveUser.last_name = params.last_name
    saveUser.lenguage = params.lenguage
    saveUser.gender = params.gender
    saveUser.diet = params.diet
    saveUser.create_date = params.create_date
    saveUser.cell_phone = params.cell_phone
    saveUser.born_date = params.born_date
    saveUser.company = params.company
    saveUser.save((err, userSaved)=>{
        if(err)
        {
            res.status(500).send({messagge: err})
        }
        else {        
        res.status(200).send({user: userSaved})
    }
    })
}

function getPointsRacha(req, res){
    let params = req.body
    user.findById(params.id, function (err, userFounder){
        if(userFounder){
            let racha = 1
            let points = 1
            let array = [29, 57, 85,113]
            if(!array.includes(params.daily)){
            if((parseInt(params.daily) - parseInt(userFounder.daily) ) === 1){
                
                racha = userFounder.racha + 1                
                if(racha > 3){
                points = parseInt(racha/ 3)
                
                if((racha % 3) > 0)
                points = points + 1
                }
                                   
                user.findByIdAndUpdate(params.id, {racha: racha, daily: params.daily}, (err, userUpdate)=>{
                    if(userUpdate){
                        res.status(200).send({puntos: points})
                    }
                })
            }
            else{
                if((parseInt(params.daily) - parseInt(userFounder.daily) ) > 1){
                user.findByIdAndUpdate(params.id, {racha: 1, daily: params.daily}, (err, userUpdate)=>{
                    if(userUpdate){
                res.status(200).send({puntos: 1})
                    }
                    else
                    res.status(404).send({puntos: 0})
                    })
                }
                else
                res.status(200).send({puntos: 0})
            }
        }
        else{
            user.findByIdAndUpdate(params.id, {racha: 1, daily: params.daily}, (err, userUpdate)=>{
                if(userUpdate){
            res.status(200).send({puntos: 1})
                }
            })
        }
        }
    })
}

function updateUser(req, res){
      
    let paramers = req.body
    let idUser = paramers.idUser
                    
        let updateQuery = {};
        updateQuery = paramers
        user.findOneAndUpdate({_id: idUser}, {$set: updateQuery}, {new: true}, (err, respuesta) => {
            if (err) {
                res.status(500).send({message: err})
            } else {
          
          res.status(200).send({user: respuesta})
            }
          })
}


function updateProperties(req, res)
{
    let paramers = req.body
    // id, type, ativityUser o userTest ....
    switch (paramers.type){
        case 1:
           user.findByIdAndUpdate(paramers.id, {$push:{activityUser: paramers.activityUser} } ,
            (err, userUpdate) => {                
                res.status(200).send({user: userUpdate})
            })
        break;

        case 2:
            user.findByIdAndUpdate(paramers.id, {$push:{userTest: paramers.userTest} } ,
                (err, userUpdate) => {                
                    res.status(200).send({user: userUpdate})
                })
            break;
            case 3:
                user.findByIdAndUpdate(paramers.id, {$push:{chat_bot_room: paramers.chat_bot_room} } ,
                    (err, userUpdate) => {                
                        res.status(200).send({user: userUpdate})
                    })
                break;
                case 4:
                    user.findByIdAndUpdate(paramers.id, {$push:{chat_bot_room: paramers.chat_bot_room} } ,
                        (err, userUpdate) => {                
                            res.status(200).send({user: userUpdate})
                        })
                    break;
    }
}



module.exports = {saveUser, updateProperties, getPointsRacha, updateUser}