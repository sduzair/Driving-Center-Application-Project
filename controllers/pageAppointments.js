const Driver = require( "../models/Driver" )
module.exports = function( req, res ) {

  //appointment not null and testResult not declared
  Driver.find( { appointmentID: { $ne: null }, testResult: null }, " firstName lastName appointmentType carMake carModel carPlatNumber image1 userID", )
    .populate( "appointmentID", { match: { isTimeSlotAvailable: false } } )
    .exec( ( error, driversObj ) => {
      console.log( driversObj )
      if( error || !driversObj || driversObj.length === 0 ) {
        res.render( "examiner/appointments", {
          errors: [ "error retrieving driver appointments" ],
          serverMsgs: null,
          driversObj: null,
        } )
      }
      // res.status( 404 ).json( driversObj )
      res.render( "examiner/appointments", {
        errors: null,
        serverMsgs: null,
        driversObj: driversObj,
      } )

    } )

}
