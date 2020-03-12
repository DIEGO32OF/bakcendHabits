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
    let idCompany = req.params
    let paramers = req.body
     if(paramers.updateType){
    company.findByIdAndUpdate(idCompany,{
        
    }
        

        )
     }
     else{
        company.findByIdAndUpdate(idCompany, 
            {$push:{areas:{ name:localIndex[1]} } },
            (err, comensalUpdate) => {

            })
     }
}


module.exports = {saveCompany, updateCompany}