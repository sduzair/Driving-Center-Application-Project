const mongoose = require( "mongoose" )
const bcrypt = require( "bcrypt" )
const uniqueValidator = require( 'mongoose-unique-validator' )

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: {
        values: [ "Driver", "Examiner", "Admin" ],
      },
      required: true,
    },
  },
  {
    versionKey: false,
  },
)

UserSchema.plugin( uniqueValidator )

UserSchema.pre( "save", function( next ) {
  const user = this

  bcrypt.hash( user.password, 10, ( error, hash ) => {
    user.password = hash
    next()
  } )

  // bcrypt.hash(driver.DOB, 10, (error, hash) => {
  // 	driver.DOB = hash
  // 	next()
  // })
} )

const User = mongoose.model( "User", UserSchema )

module.exports = User
