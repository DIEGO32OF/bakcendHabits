'use strict'
var mongoose = require('mongoose');
const userTest = require('../models/userTest');

async function saveUserTest(results, idTest, idUser){

   let saveUT = new userTest()
   saveUT.idTest = idTest
   saveUT.idUser = idUser
   saveUT.active = true
   saveUT.createDate = ''
   saveUT.isCurrent = true
  saveUT.result = results
   saveUT.save()

}


async function updateAll(idUser){
    userTest.find({idUser: idUser}).exec( async (err, userTestFound) => {        
        if(!err){
            for(const foundIt of userTestFound){
             await userTest.findByIdAndUpdate(foundIt._id, {$set:{isCurrent:false}},async (error, userTestUpdate)=>{
                console.log(userTestUpdate, 'updateAll')
                })
            }
        }
       })
}




module.exports = {saveUserTest, updateAll}