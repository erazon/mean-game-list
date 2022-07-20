const mongoose = require('mongoose');
require('./games-model');

mongoose.connect(process.env.DB_URL);

mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to ', process.env.DB_NAME);
})

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected');
})

mongoose.connection.on('error', function(err){
    console.log('Error', err);
})

process.on('SIGINT', function(){ //SIGTERM, SIGUSR2 process.once('SIGUSR2', function(){})
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected by app termination');
        process.exit(0);
    })
})

process.on('SIGUSR2', function(){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected by app termination');
        process.kill(process.pid);
    })
})