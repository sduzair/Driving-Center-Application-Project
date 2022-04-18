const Driver = require( "../models/Driver" )
module.exports = function( req, res ) {

  const errors = req.flash( 'validationErrors' )
  const serverMsgs = req.flash( 'serverMsgs' )

  //appointment not null and testResult not declared
  Driver.find( { appointmentID: { $ne: null }, testResult: null }, " firstName lastName appointmentType carMake carModel carPlatNumber image1 userID", )
    .populate( "appointmentID", { match: { isTimeSlotAvailable: false } } )
    .exec( ( error, driversObj ) => {
      if( error || !driversObj || driversObj.length === 0 ) {
        res.render( "examiner/appointments", {
          errors: errors ? errors : [ "error retrieving driver appointments" ],
          serverMsgs: serverMsgs,
          driversObj: null,
          filteredBy: null
        } )
      }
      // res.status( 404 ).json( driversObj )
      res.render( "examiner/appointments", {
        errors: errors,
        serverMsgs: serverMsgs,
        driversObj: driversObj,
        filteredBy: null
      } )

    } )

}
