const Driver = require( "../models/Driver" )

module.exports = function( req, res ) {
    const { filterType } = req.params
    Driver.find( { appointmentType: filterType, appointmentID: { $ne: null }, testResult: null } )
        .populate( "appointmentID", { match: { isTimeSlotAvailable: false } } )
        .exec( ( error, driversObj ) => {
            if( error || !driversObj || driversObj.length === 0 ) {
                res.render( "examiner/appointments", {
                    errors: [ "error retrieving driver appointments" ],
                    serverMsgs: null,
                    driversObj: null,
                    filteredBy: filterType,
                } )
            }
            // res.status( 200 ).json( driversObj )
            res.render( "examiner/appointments", {
                errors: null,
                serverMsgs: null,
                driversObj: driversObj,
                filteredBy: filterType,
            } )

        } )
}

