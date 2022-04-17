const Driver = require("../models/Driver")

module.exports = function (req, res) {
    const {type} = req.params
    Driver.find({appointmentType: type, appointmentID: {$ne:null}})
        .populate("appointmentID", {match: {isTimeSlotAvailable: false}})
        .exec((error, driverObj) => {
            if (error || !driverObj || driverObj.length === 0) {
                return res.status(404).json({"message": "Driver not found"})
            }
            res.status(200).json(driverObj)

        })
}

