'use strict'
let mongoose = require('mongoose');

let company = mongoose.Schema;
let companyModel = company({

    active: Boolean,
    exp_date: String,
    start_date: String,
    key: String,
    logo: String,
    name: String,
    //areas: [{name: String }],
    timeZonesAllowed:[String],
    filtros:[
        {name:String,values:[String]}        
    ]

});

module.exports = mongoose.model('company', companyModel);