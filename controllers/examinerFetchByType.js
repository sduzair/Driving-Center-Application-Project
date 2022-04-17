const Driver = require("../models/Driver")

module.exports = async function readDriverDetails(req, res) {
    const {type} = req.params
    Driver.find({appointmentType: type})
        .populate("appointmentID")
        .exec((error, driverObj) => {
            console.log(error)
            console.log(driverObj)
            if (error || !driverObj || driverObj.length === 0) {
                console.log("error")
                res.status(404).json({"message": "Driver not found"})
            } else {
                console.log("success")
                res.status(200).json(driverObj)
            }
        })
}

