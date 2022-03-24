module.exports = ( req, res, next ) => {
  if(
    req.body.inputHouseNumber == "" ||
    req.body.inputStreet == "" ||
    req.body.inputCity == "" ||
    req.body.inputProvince == "" ||
    req.body.inputPostalCode == "" ||
    req.body.inputCarMake == "" ||
    req.body.inputCarModel == "" ||
    req.body.inputCarYear == "" ||
    req.body.inputCarPlatNumber == ""
  ) {
    // req.flash( 'validationErrors', [ "Please ensure all fields have a value" ] )
    // req.flash( 'date', req.body )
    // return res.redirect( '/driver/g2_page' )
    return res.render( "driver/g2_page", {
      driver: {
        ...req.body,
        DOB: req.body.inputDOB,
        carLicenceNumber: req.body.inputCarLicenceNumber,
      },
      errors: [ "Please ensure all fields have a value" ],
      serverMsgs: null,
      data: req.body,
    } )
  }
  next()
}
