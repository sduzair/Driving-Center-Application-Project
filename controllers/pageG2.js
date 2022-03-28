const Driver = require( "../models/Driver" )
const bcrypt = require( "bcryptjs" )

module.exports = async function readDriverDetails( req, res ) {
  Driver.find( { userID: req.session.userId }, ( error, driver ) => {
    const [ driverObj ] = driver
    if( error || !driver ) {
      res.status( 401 ).render( "driver/g2_page", {
        driver: null,
        errors: error.errors
          ? Object.keys( error.errors ).map( key => error.errors[ key ].message )
          : [ "Error finding driver!" ],
        serverMsgs: null,
        data: null,
      } )
    } else {
      bcrypt.compare( "_defaultinputCarLicenceNumber", driverObj.carLicenceNumber, ( err, same ) => {
        if( same ) {
          const data = req.flash( 'data' )[ 0 ]
          return res.render( "driver/g2_page", {
            driver: false,
            errors: req.flash( 'validationErrors' ),
            serverMsgs: data ? null : [ "Pls enter new driver details" ],
            data: data,
          } )
        } else {
          const data = req.flash( 'data' )[ 0 ]
          return res.render( "driver/g2_page", {
            driver: driverObj,
            errors: req.flash( 'validationErrors' ),
            serverMsgs: data ? null : [ "Driver found. You can update the details" ],
            data: data,
          } )
        }
      } )
    }
  } )
}

