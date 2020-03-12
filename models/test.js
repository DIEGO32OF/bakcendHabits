'use strict'
let mongoose = require('mongoose');

let test = mongoose.Schema;
let testModel = test({

    active: Boolean,
    name: String,
    description: String,
    type: String,
    question:[{
        points: Number,
        text: String,        
            html: String,
            max: Number,
            min: Number,        
        pillar: Number
    }],
    level: Number


});

module.exports = mongoose.model('test', testModel);