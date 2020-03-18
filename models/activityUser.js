'use strict'
let mongoose = require('mongoose');

let activityUser = mongoose.Schema;
let activityUserModel = activityUser({

    active: Boolean,
    idUser: String,
    idTest: { type: activityUser.ObjectId, ref: 'test' },
    level : Number,
    dateStablished: String,    
    activities:[{
        status: Number,
        activity: { type: activityUser.ObjectId, ref: 'activity' },
        points: Number,
        userAnswer: String,
        day: Number,
        date: String,
        isFavorite: Boolean,
    }]    
});

module.exports = mongoose.model('activityuser', activityUserModel);