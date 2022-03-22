const Driver = require( "../models/Driver" )
const bcrypt = require( "bcrypt" )

module.exports = async function readDriverDetails( req, res ) {
  Driver.find( { userID: req.session.userId }, ( error, driver ) => {
    const [ driverObj ] = driver
    if( error || !driver ) {
      res.status( 401 ).render( "driver/g2_page", {
        driver: null,
        msg: "No such driver exists!",
      } )
    } else {
      bcrypt.compare( "_defaultinputCarLicenceNumber", driverObj.carLicenceNumber, ( err, same ) => {
        if( same ) {
          return res.render( "driver/g2_page", {
            driver: true,
            msg: "Pls enter new driver details"
          } )
        } else {
          return res.render( "driver/g2_page", {
            driver: driverObj,
            msg: "Driver found. You can update the details",
          } )
        }
      } )
    }
  } )
}
