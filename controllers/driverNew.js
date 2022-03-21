const Driver = require("../models/Driver")
const path = require("path")

module.exports = async function createDriverDetails(req, res) {
  let image1 = req.files.image1
  let image2 = req.files.image2
  await image1.mv(path.resolve(__dirname, "..", "public/img", image1.name))
  await image2.mv(path.resolve(__dirname, "..", "public/img", image2.name))

  const g2Driver = new Driver()
  g2Driver.firstName = req.body.firstName
  g2Driver.lastName = req.body.lastName
  g2Driver.userID = req.body.userID
  g2Driver.DOB = req.body.inputDOB
  g2Driver.address.houseNumber = req.body.inputHouseNumber
  g2Driver.address.street = req.body.inputStreet
  g2Driver.address.city = req.body.inputCity
  g2Driver.address.province = req.body.inputProvince
  g2Driver.address.postalCode = req.body.inputPostalCode
  g2Driver.carMake = req.body.inputCarMake
  g2Driver.carModel = req.body.inputCarModel
  g2Driver.carYear = req.body.inputCarYear
  g2Driver.carPlatNumber = req.body.inputCarPlatNumber
  g2Driver.carLicenceNumber = req.body.inputCarLicenceNumber
  g2Driver.image1 = "/img/" + image1.name
  g2Driver.image2 = "/img/" + image2.name

  // creating document in db
  Driver.create(g2Driver, (err, driver) => {
    if (!err) {
      res.render("driver/dashboard", {
        msg: "New driver created.",
      })
    } else console.log(err)
  })
}
