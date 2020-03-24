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
    saveUser.point = params.point
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
    }
}



module.exports = {saveUser, updateProperties}