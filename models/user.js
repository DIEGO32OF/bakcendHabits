'use strict'
let mongoose = require('mongoose');

let user = mongoose.Schema;
let userModel = user({
wellness: Number,
tester: Boolean,
steps_goal: Number,
test: String,
status: String,
seven_days: Number,
rol: String,
points: Number,
picture: String,
old_week: Number,
name_first: String,
name: String,
mail: String,
last_name_first: String,
last_name: String,
lenguage: String,
gender: String, 
diet: String,
create_date: String,
cell_phone: String,
born_date: String,
chat_bot_room: [{name: String, id: String}],
activityUser: [{ type: user.ObjectId, ref: 'activityUser' }],
company: { type: user.ObjectId, ref: 'company' },
userTest: [{ type: user.ObjectId, ref: 'userTest' }],


   

});

module.exports = mongoose.model('user', userModel);