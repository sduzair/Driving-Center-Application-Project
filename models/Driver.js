const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const DriverSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userID: {
    type: String,
    unique: true,
  },
  DOB: String,
  address: {
    houseNumber: Number,
    street: String,
    city: String,
    province: String,
    postalCode: String,
  },
  carMake: String,
  carModel: String,
  carYear: Number,
  carPlatNumber: Number,
  carLicenceNumber: {
    type: String,
    unique: true,
  },
  image1: String,
  image2: String,
})

DriverSchema.pre("save", function (next) {
  const driver = this

  bcrypt.hash(driver.carLicenceNumber, 10, (error, hash) => {
    driver.carLicenceNumber = hash
    next()
  })

  // bcrypt.hash(driver.DOB, 10, (error, hash) => {
  // 	driver.DOB = hash
  // 	next()
  // })
})

const Driver = mongoose.model("Driver", DriverSchema)

module.exports = Driver
