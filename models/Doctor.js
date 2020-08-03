//Importing Mongoose
const mongoose = require('mongoose');

//creating a new Doctor Schema
const doctorSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

//tell mongoose to use the above schema as Doctor
const Doctor = mongoose.model('Doctor', doctorSchema);

//export the model
module.exports = Doctor;
