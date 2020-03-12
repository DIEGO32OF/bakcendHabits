'use strict'
var mongoose = require('mongoose');
var app=require('./app');

var port=process.env.PORT||3977;

mongoose.connect('mongodb://habitsBack:habitsBack1@ds329058.mlab.com:29058/heroku_b8lq3ppl', (err,res) => {
  if(err){
    throw err;
}

else{
  console.log('Register Bd correct');
  app.listen(port,function(){console.log('Server is run correct port:'+port);});
}
});