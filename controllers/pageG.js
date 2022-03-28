const Driver = require( "../models/Driver" )
const bcrypt = require( "bcryptjs" )

module.exports = async function readDriverDetails( req, res ) {
  Driver.find( { userID: req.session.userId }, ( error, driver ) => {
    const [ driverObj ] = driver
    if( error || !driver ) {
      res.status( 401 ).render( "driver/g_page", {
        driver: null,
        errors: error.errors
          ? Object.keys( error.errors ).map( key => error.errors[ key ].message )
          : [ "Error finding driver!" ],
        serverMsgs: null
      } )
    } else {
      bcrypt.compare( "_defaultinputCarLicenceNumber", driverObj.carLicenceNumber, ( err, same ) => {
        if( same ) {
          req.flash( 'validationErrors', [ 'First enter new driver details' ] )
          return res.redirect( "/driver/g2_page" )
        } else {
          return res.render( "driver/g_page", {
            driver: driverObj,
            errors: req.flash( 'validationErrors' ),
            serverMsgs: [ "Driver found." ],
          } )
        }
      } )
    }

  } )
}
