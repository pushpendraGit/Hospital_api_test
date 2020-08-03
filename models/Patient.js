//Importing Mongoose
const mongoose = require('mongoose');

//Creating the patient Schema
const patientSchema = new mongoose.Schema({
    phone:{
        type:String,
        required:true
    },
    report:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report'
    }]
}, {timestamps:true});

//Setting schema name and telling mongoose to use the schema
const Patient = mongoose.model('Patient', patientSchema);

//exporting schema
module.exports = Patient;
