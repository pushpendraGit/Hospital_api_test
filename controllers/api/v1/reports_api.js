//this function returns all the reports by a particular Status
const Report = require('../../../models/Report');
module.exports = async function (req, res) {
    const Status = req.params.status;

    try {
        //getting positive reports and populating the Patients of those reports
        let reports = await Report.find({ Status: Status }).populate('Patient');
        if (reports.length == 0) {
            return res.status(200).json({ "Message": "No reports with this Status" });
        }
        else {
            return res.status(200).json(reports);
        }
    } catch (error) {
        if(error){
            return res.status(200).json({ "Message": "Internal Server error" });
        }
    }
}