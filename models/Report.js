//Importing Mongoose
const mongoose = require('mongoose');
const { report } = require('../routes');

//creating a new Schema 
const reportSchema = new mongoose.Schema({
    DoctorName:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    },
    Patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required:true
    }

},{timestamps:true});

//tell mongoose to use this model
const Report = mongoose.model('Report', reportSchema);

//export the model
module.exports = Report;