const Driver = require( "../models/Driver" )
const path = require( "path" )

module.exports = async function createDriverDetails( req, res ) {
  let image1 = req.files.image1
  let image2 = req.files.image2
  await image1.mv( path.resolve( __dirname, "..", "public/img", image1.name ) )
  await image2.mv( path.resolve( __dirname, "..", "public/img", image2.name ) )

  const g2Driver = {}
  g2Driver.firstName = req.body.firstName
  g2Driver.lastName = req.body.lastName
  g2Driver.DOB = req.body.inputDOB
  g2Driver.address = {
    houseNumber: req.body.inputHouseNumber,
    street: req.body.inputStreet,
    city: req.body.inputCity,
    province: req.body.inputProvince,
    postalCode: req.body.inputPostalCode,
  }
  g2Driver.carMake = req.body.inputCarMake
  g2Driver.carModel = req.body.inputCarModel
  g2Driver.carYear = req.body.inputCarYear
  g2Driver.carPlatNumber = req.body.inputCarPlatNumber
  g2Driver.carLicenceNumber = req.body.inputCarLicenceNumber
  g2Driver.image1 = "/img/" + image1.name
  g2Driver.image2 = "/img/" + image2.name


  Driver.findOneAndUpdate( { userID: req.session.userId }, g2Driver, {
    new: true,
  }, ( err, driver ) => {
    if( !err ) {
      res.redirect( "/driver/dashboard" )
    } else console.log( err )
  } )
}
