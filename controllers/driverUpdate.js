const Driver = require("../models/Driver")

module.exports = async function updateDriverDetails(req, res) {
  const update = {
    address: {
      houseNumber: req.body.inputHouseNumber,
      street: req.body.inputStreet,
      city: req.body.inputCity,
      province: req.body.inputProvince,
      postalCode: req.body.inputPostalCode,
    },
    carMake: req.body.inputCarMake,
    carModel: req.body.inputCarModel,
    carYear: req.body.inputCarYear,
    carPlatNumber: req.body.inputCarPlatNumber,
  }
  await Driver.findOneAndUpdate({ userID: req.body.userID }, update, {
    new: true,
  })
  res.redirect( "/driver/dashboard" )
}
