const Patient = require('../../../models/Patient');
const Report = require('../../../models/Report');


//this function is used to register the patient after doing required checks
module.exports.register = async function (req, res) {
    if (req.body == undefined || req.body.phone == undefined || req.body.phone.length == 0) {
        return res.status(200).json({ "Message": "Cannot register patient without Phone number!" });
    }

    try {
        let newPatient = await Patient.create(req.body);
        if (newPatient) {
            return res.status(200).json({ "message": "New Patient Registered" });
        }

    } catch (err) {
        return res.status(500).send({ "Message": "Internal Server Error" });
    }
}

//this function creates the report of a particular Patient by an Authorized doctor
module.exports.createReport = async function (req, res) {
    const id = req.params.id;
    console.log(req.body);
    if (!req.body.Status || req.body.Status.length == 0) {
        return res.status(422).json({ "Message": "Please enter the status of report" });
    }

    try {
        let patient = await Patient.findOne({ "phone": id });
        if (!patient) {
            return res.status(200).json({ "Message": "No such Patient" });
        }
        else {
            let new_report = await Report.create(
                {
                    "DoctorName": req.user.username,
                    "Status": req.body.Status,
                    "Patient": patient._id
                });

            patient.report.push(new_report);
            patient.save();
            return res.status(200).json({ "message": "Report created" });
        }
    }
    catch (error) {
        if (error) {
            console.log(error);
            return res.status(500).json({ "Message": "Internal Server Error" });
        }
    }
}

//this function returns all the reports of a particular Patient
module.exports.allreports = async function (req, res) {
    const id = req.params.id;
    try {
        let patient = await Patient.findOne({ "phone": id });
        if (!patient) {
            return res.status(200).json({ "Message": "No such user" });
        }
        else {

            if (!patient.report || patient.report.length == 0) {
                return res.status(200).json({ "Message": "No reports yet!" });
            }

            const allreports = [];
            for (let i = 0; i < patient.report.length; i++) {
                let oneReport = await Report.findById(patient.report[i]);
                allreports.push({
                    "Doctor Name": oneReport.DoctorName,
                    "Status Of Covid-19": oneReport.Status,
                    "Report Created At": oneReport.Date
                });
            }

            console.log(allreports);
            return res.status(200).json(allreports);
        }

    } catch (err) {
        if (err) {
            return res.status(500).json({ "message": "Internal server error" });
        }
    }
}
