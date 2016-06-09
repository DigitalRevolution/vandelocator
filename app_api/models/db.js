var mongoose = require('mongoose');

// Define the database to connect to
var dbURI = 'mongodb://localhost/VanDeLocator';
if (process.env.NODE_ENV ==='production') {
    dbURI = process.env.MONGOLAB_URI;
}
// Open mongoose connection
mongoose.connect(dbURI);


// Create a way to terminate connections (avoid duplicating connections
var gracefulShutdown = function(msg, callback){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// Monitor connection events
mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to '+ dbURI);
});
mongoose.connection.on('error', function(err){
    console.log('Mongoose connection Error: ' + err);
});
mongoose.connection.on('closed', function(){
    console.log('Mongoose disconnected');
});

// Monitor Node events to close connection on app close
process.once( 'SIGUSR2', function(){
    gracefulShutdown('nodemon restart', function(){
        process.kill(process.pid, 'SIGUSR2');
    });
});
process.on( 'SIGINT', function(){
    gracefulShutdown('app termination', function(){
        process.exit(0);
    });
});
process.on( 'SIGTERM', function(){
    gracefulShutdown('Heroku app shutdown', function(){
        process.exit(0);
    });
});

// bind schema / model at the end of this file
require('./locations');