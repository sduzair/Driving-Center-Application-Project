const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
// todo: set required fields
const DriverSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: String,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  DOB: {
    required: true,
    type: String,
  },
  address: {
    houseNumber: {
      required: true,
      type: Number,
    },
    street: {
      required: true,
      type: String,
    },
    city: {
      required: true,
      type: String,
    },
    province: {
      required: true,
      type: String,
    },
    postalCode: {
      required: true,
      type: String,
    },

  },
  carMake: {
    required: true,
    type: String,
  },
  carModel: {
    required: true,
    type: String,
  },
  carYear: {
    required: true,
    type: Number,
  },
  carPlatNumber: {
    required: true,
    type: Number,
  },
  carLicenceNumber: {
    type: String,
    required: true,
  },
  image1: {
    required: true,
    type: String,
  },
  image2: {
    required: true,
    type: String,
  },
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
