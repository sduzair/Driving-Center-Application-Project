const Driver = require( "../models/Driver" )
const bcrypt = require( "bcrypt" )
const { redirect } = require( "express/lib/response" )

module.exports = async function readDriverDetails( req, res ) {
  Driver.find( { userID: req.session.userId }, ( error, driver ) => {
    const [ driverObj ] = driver
    if( error || !driver ) {
      res.status( 401 ).render( "driver/g_page", {
        driver: null,
        msg: "No such driver exists!",
      } )
    } else {
      bcrypt.compare( "_defaultinputCarLicenceNumber", driverObj.carLicenceNumber, ( err, same ) => {
        if( same ) {
          return res.redirect( "/driver/g2_page" )
        } else {
          return res.render( "driver/g_page", {
            driver: driverObj,
            msg: "Driver found.",
          } )
        }
      } )
    }

  } )
}
