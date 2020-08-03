const express = require('express');
const router = express.Router();
const port = process.env.PORT || 8000;
const app = express();
const mogoose = require('mongoose');
const db = require('./config/mongoose');
const passport = require('passport');
const JWTStrategy = require('./config/passport_jwt_strategy');

//setting up express
app.use(express.urlencoded({extended:true}));
app.use('/', require('./routes/index'));


//Starting the node app
module.exports = app.listen(port , function(err){
    if(err){
        return console.log('Error starting the app at port', port);
    }
    console.log(`App running on port ${port}`);
})

