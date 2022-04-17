const Driver = require("../models/Driver");
module.exports = function( req, res ) {
    //appointment not null and testResult not declared
    Driver.find({appointmentID: {$ne:null}, testResult: {$ne:null}}, "-carMake -carModel -carYear -carLicenceNumber -DOB -userID -address")
        .populate("appointmentID", {match: {isTimeSlotAvailable: false}})
        .exec((error, driversObj) => {
            if( error || !driversObj || driversObj.length === 0 ) {
                res.render( "admins/appointments", {
                    errors: [ "error retrieving driver appointments" ],
                    serverMsgs: null,
                    driversObj: null,
                } )
            }
            // res.status( 404 ).json( driversObj )
            res.render( "admins/appointments", {
                errors: null,
                serverMsgs: null,
                driversObj: driversObj,
            } )

        })

}