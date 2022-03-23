const Driver = require( "../models/Driver" )
const bcrypt = require( "bcrypt" )

module.exports = async function readDriverDetails( req, res ) {
  Driver.find( { userID: req.session.userId }, ( error, driver ) => {
    const [ driverObj ] = driver
    if( error || !driver ) {
      res.status( 401 ).render( "driver/g2_page", {
        driver: null,
        errors: error.errors
          ? Object.keys( error.errors ).map( key => error.errors[ key ].message )
          : [ "Error finding driver!" ],
        serverMsgs: null
      } )
    } else {
      bcrypt.compare( "_defaultinputCarLicenceNumber", driverObj.carLicenceNumber, ( err, same ) => {
        if( same ) {
          return res.render( "driver/g2_page", {
            driver: false,
            errors: req.flash( 'validationErrors' ),
            serverMsgs: [ "Pls enter new driver details" ]
          } )
        } else {
          return res.render( "driver/g2_page", {
            driver: driverObj,
            errors: req.flash( 'validationErrors' ),
            serverMsgs: [ "Driver found. You can update the details" ]
          } )
        }
      } )
    }
  } )
}

