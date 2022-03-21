module.exports = (req, res, next) => {
  if (
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
    return res.render("driver/g_page", {
      driver: null,
      msg: "Please ensure that all the fields have a value",
    })
  }
  next()
}
