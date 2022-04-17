const Driver = require("../models/Driver");
module.exports = function( req, res ) {
    //appointment not null and testResult not declared
    Driver.find({appointmentID: {$ne:null}, testResult: {$ne:null}}, "-carMake -carModel -carYear -carLicenceNumber -DOB -userID -address")
        .populate("appointmentID", {match: {isTimeSlotAvailable: false}})
        .exec((error, driverObj) => {
            if (error || !driverObj || driverObj.length === 0) {
                return res.status(200).json({"message": "Driver not found"})
            }
            // res.status(404).json(driverObj)
            res.render("examiner/appointments", {
                errors: null,
                serverMsgs: null,
                driverObj: driverObj,
            });

        })

}