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
    return res.render( "driver/g2_page", {
      driver: null,
      serverMsgs: [ "Please ensure that all the fields have a value" ],
      errors: req.flush( 'validationErrors' ),
    } )
  }
  next()
}
