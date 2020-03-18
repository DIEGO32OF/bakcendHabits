'use strict'
let mongoose = require('mongoose');

let userTest = mongoose.Schema;
let userTestModel = userTest({

    active: Boolean,
    createDate: String,
    idTest: String,
    idUser: String,
    isCurrent: Boolean,
    result:[{
        typer: String,
        id: Number,
        porcent: Number,
        nivel: Number
    }]

});

module.exports = mongoose.model('userTest', userTestModel);