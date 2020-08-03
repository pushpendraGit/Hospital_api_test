const Doctor = require('../../../models/Doctor');
const jwt = require('jsonwebtoken');

module.exports.login = async function (req, res) {
    try {
        let doctor = await Doctor.findOne({"username":req.body.username});
        if(doctor){
            if(doctor.password!=req.body.password){
                return res.status(422).json({"Message":"Invalid Credentails"});
            }
            else{
                res.status(200).json({
                    "Message":"Signed in Successfully",
                    "token":jwt.sign(doctor.toJSON(),'anurag-jwt-key', {expiresIn:1000000})
                });
            }
        }
        else{
            return res.status(422).json({"Message":"Invalid Credentails"});
        }
    } catch (error) {
        if(error){
            return res.status(500).json({"Message":"Internal Server Error"});
        }
    }
}

module.exports.register = async function (req, res) {
    console.log(req.body);
    if (req.body == undefined || req.body.username == undefined || req.body.username.length == 0 || !req.body.password) {
        res.status(200).json({ "message": "send username and password" });
        return;
    }
    try {
        let findDoctor = await Doctor.findOne({ "username": req.body.username });
        if (findDoctor) {
            res.status(200).json({ "Message": "Doctor already registered, try other username" });
            return;
        }
        else {
            let new_doctor = await Doctor.create(req.body);
            if (new_doctor) {
                 res.status(200).json({ "Message": "New Doctor registered" });
                 return;
            }
        }
    } catch (error) {
        if (error) {
            return res.status(500).json({ "message": "Internal Server Error" });
        }
    }

}