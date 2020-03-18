'use strict'
var mongoose = require('mongoose');
const company = require('../models/company');


// falta el get company por nombre o id

function getCompany(req, res){
    let param = req.body
    switch(param.option){
        case 1:
            company.findById(param.name, function (err, companyFound) {
                if(err)
                res.status(500).send({message: err})
                else
                res.status(200).send({company: companyFound})
            })
            break;

            case 2:
                company.findOne({name: param.name}, (err, companyFound) => {
                    if(err)
                    res.status(500).send({message: err})
                    else
                    res.status(200).send({company: companyFound})
                })
                break;

                case 3:
                    company.findOne({key: param.name}, (err, companyFound) => {
                        if(err)
                        res.status(500).send({message: err})
                        else
                        res.status(200).send({company: companyFound})
                    })
                    break;
                
    }
    
}

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
     if(paramers.updateType){
             
        company.findByIdAndUpdate(idCompany, 
            
            {$push:{timeZonesAllowed: paramers.times} } ,
            (err, companyUpdate) => {                
                res.status(200).send({company: companyUpdate})
            })
     }
     else{
         let arrAreas = []
         for(const area of  paramers.areas){
            arrAreas.push({name: area.name})
             }             
        company.findByIdAndUpdate(idCompany, 
            
            {$push:{areas: arrAreas} } ,
            (err, companyUpdate) => {                
                res.status(200).send({company: companyUpdate})
            })
     }
}


module.exports = {saveCompany, updateCompany, getCompany}