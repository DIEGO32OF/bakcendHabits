'use strict'
var mongoose = require('mongoose');
const company = require('../models/company');

function saveCompany(req, res){

let paramms = req.body
company.findOne({name: paramms.name}, (err, companyFound ) => {
    if(companyFound){
        res.status(422).send({message: 'Empresa ya existe'})
    }
    else{
        let newCompany = new company()
        newCompany.active = true
        newCompany.exp_date = paramms.exp_date
        newCompany.start_date = paramms.start_date
        newCompany.key = paramms.key
        newCompany.logo = paramms.logo
        newCompany.name = paramms.name
        for(const area of paramms.areas){
            newCompany.areas.push({name: area.name})
            }
            for(const times of paramms.timeZonesAllowed){
                newCompany.timeZonesAllowed.push(times)
            }

        newCompany.save((err,companySaved) =>{
            if(err){
                res.status(500).send({message: 'ocurrio un error al guardar la compañia por favor intente de nuevo'})
            }
            else{
                res.status(200).send({company: companySaved})
            }            
        })
    }
})
}

function updateCompany(req, res){
    
    
    let paramers = req.body
    let idCompany = paramers.company
    console.log(idCompany)
     if(paramers.updateType){

             console.log(paramers.times)
        company.findByIdAndUpdate(idCompany, 
            
            {$push:{timeZonesAllowed: paramers.times} } ,
            (err, companyUpdate) => {
                console.log(companyUpdate)
                res.status(200).send({company: companyUpdate})
            })
     }
     else{
         let arrAreas = []
         for(const area of  paramers.areas){
            arrAreas.push({name: area.name})
             }
             console.log(arrAreas)
        company.findByIdAndUpdate(idCompany, 
            
            {$push:{areas: arrAreas} } ,
            (err, companyUpdate) => {
                console.log(companyUpdate)
                res.status(200).send({company: companyUpdate})
            })
     }
}


module.exports = {saveCompany, updateCompany}