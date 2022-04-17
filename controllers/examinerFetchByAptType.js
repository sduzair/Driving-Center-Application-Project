const Driver = require("../models/Driver")

module.exports = function (req, res) {
    const {type} = req.params
    Driver.find({appointmentType: type, appointmentID: {$ne:null}})
        .populate("appointmentID", {match: {isTimeSlotAvailable: false}})
        .exec((error, driversObj) => {
            if( error || !driversObj || driversObj.length === 0 ) {
                res.render( "examiner/appointments", {
                    errors: [ "error retrieving driver appointments" ],
                    serverMsgs: null,
                    driversObj: null,
                    filteredBy: type,
                } )
            }
            // res.status( 404 ).json( driversObj )
            res.render( "examiner/appointments", {
                errors: null,
                serverMsgs: null,
                driversObj: driversObj,
                filteredBy: type,
            } )

        })
}

