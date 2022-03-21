// at the current stage only users of user type 'Driver' are able to login and access the driver dashboard

const User = require( "../models/User" )
const bcrypt = require( "bcrypt" )

module.exports = function userLogin( req, res ) {
  const { password, username } = req.body
  User.findOne( { username: username }, ( error, user ) => {
    if( user ) {
      bcrypt.compare( password, user.password, ( error, same ) => {
        if( same ) {
          // store user session
          // user _id assigned to the session - the data is saved on the users browser
          // now each time user makes a request this cookie is sent to server with authentication id
          // todo: check session id before fetch, new, update
          req.session.userId = user._id
          if( user.userType === "Driver" ) {
            res.redirect( "/driver/dashboard" )
          } else res.redirect( "/login" )
        } else {
          res.redirect( "/login" )
        }
      } )
    } else {
      res.redirect( "/login" )
    }
  } )
  // todo: check password and do something

  // res.render("", {
  //   msg: "Login successfull!",
  // })
}
