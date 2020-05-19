'use strict'
var mongoose = require('mongoose');
const user = require('../models/user');
const conversation = require('../models/conversation');


function saveConversation(req, res){
let param = req.body
let convSave = new conversation()
convSave.advanced = param.advanced
convSave.basic = param.basic
convSave.intermediate = param.intermediate
convSave.change_habit = param.change_habit
convSave.n_conversation = param.n_conversation
convSave.points = param.points
convSave.notification = param.notification
convSave.pillar = convSave.pillar
convSave.next_advanced = param.next_advanced
convSave.next_intermediate = param.next_intermediate
convSave.next_basic = param.next_basic
convSave.save((err, conversationSaved) =>{
    if(err)
    res.status(500).send({message: err})
    else if(conversationSaved)
    res.status(200).send({convesation: conversationSaved})
})
}

function getUser(req, res){
let param = req.body
user.findById(param.idUser, function (err, userFound){ 
    if(err)
    res.status(500).send({message: err})
    else if(userFound){
        res.status(200).send({user: userFound})
    }

})

}


function getConversationByUser(req, res){
let params = req.body

let arrayUsers = params.users.map(u => u.idMgDB)
console.log(arrayUsers)

let arrResult = []
let result = []
user.find({_id: {$in:arrayUsers}}, function (err, userFounded){
    if(err)
    res.status(404).send({message: err})
    else{
        
    userFounded.map(m => {
        
        let uidFilter = params.users.filter(p => p.idMgDB == m._id).map(m => m.uid)
        console.log(m._id, uidFilter)
        if(m.conversation != ''){
     
    conversation.findOne({$or:[{basic: m.conversation},{intermediate: m.conversation}, {advanced: m.conversation }]}, function(myerr, conversations){
if(err)
res.status(500).send({message:err})
else{
    if(conversations){
        let myConversation = conversations._doc
        let level = Object.keys(myConversation).find(key => myConversation[key] === m.conversation)        
        let mensaje = myConversation.notification[level]
        let nextConversation = ''
        switch(level){
            case  'basic' :
                nextConversation = myConversation.next_basic
                break
                case  'intermediate' :
                    nextConversation = myConversation.next_intermediate
                break
                case  'advanced' :
                    nextConversation = myConversation.next_advanced
                    break
                
        }
        
        arrResult.push({currentConv: m.conversation, status: m.conversationStatus, nextConv: nextConversation, estatusConv: m.conversationStatus,  idMgDB:m._id, uid: uidFilter[0], nivel: level,
             mensajes: mensaje, change_habit: myConversation.change_habit, n_conversation: myConversation.n_conversation })
        //console.log(arrResult, 46)
    }
}
    })

}
  
})

setTimeout(() => {        
    res.status(200).send({conversations: arrResult})
   }, 1000);
    
    }
})
}

function saveUser(req, res){

    let params = req.body    
    let saveUser = new user()
    saveUser.wellness = params.wellness
    saveUser.tester = params.tester
    saveUser.steps_goal = params.steps_goal
    saveUser.seven_days = params.seven_days
    saveUser.status = params.status
    saveUser.rol = params.rol
    saveUser.points = params.points
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
    saveUser.racha = params.racha
    saveUser.daily = params.daily
    saveUser.conversation = params.conversation
    saveUser.conversationStatus = params.conversationStatus
    saveUser.create_date = params.create_date
    saveUser.cell_phone = params.cell_phone
    saveUser.born_date = params.born_date
    saveUser.company = params.company
    saveUser.filtros = params.filtros
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
                else{

                res.status(200).send({puntos: 0})            
           // } )
                }
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
                    user.findByIdAndUpdate(paramers.id, {$push:{filtros: paramers.filtros} } ,
                        (err, userUpdate) => {                
                            res.status(200).send({user: userUpdate})
                        })
                    break;
    }
}



module.exports = {getUser, saveUser, updateProperties, getPointsRacha, updateUser, saveConversation, getConversationByUser }
