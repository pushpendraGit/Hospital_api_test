const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const Doctor = require('../models/Doctor');

//setting options for jwt strategy like the key and method of token extraction
let opts ={
    jwtFromRequest:extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'anurag-jwt-key',
};

//telling passprt to use JWT strategy
passport.use(new jwtStrategy(opts ,function(payload , done){
    Doctor.findById(payload._id,function(err, doctor){
        if(err){
            console.log('Error in finding user from JWT');
            return; 
        }
        else if(doctor){
            return done(null, doctor);
        }
        else return done(null , false);
    });
}));

//exporting passport
module.exports = passport;