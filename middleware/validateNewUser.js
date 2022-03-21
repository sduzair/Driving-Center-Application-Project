module.exports = (req, res, next) => {
  if (
    req.files == null ||
    req.body.firstName == null ||
    req.body.lastName == null ||
    req.body.userID == null ||
    req.body.inputDOB == null ||
    req.body.inputHouseNumber == null ||
    req.body.inputStreet == null ||
    req.body.inputCity == null ||
    req.body.inputProvince == null ||
    req.body.inputPostalCode == null ||
    req.body.inputCarMake == null ||
    req.body.inputCarModel == null ||
    req.body.inputCarYear == null ||
    req.body.inputCarPlatNumber == null ||
    req.body.inputCarLicenceNumber == null
  ) {
    return res.render("driver/g2_page", {
      msg: "Please ensure that all the fields have a value",
    })
  }
  next()
}
