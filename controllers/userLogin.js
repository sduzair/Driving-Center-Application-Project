// at the current stage only users of user type 'Driver' are able to login and access the driver dashboard
// user id and type is assigned to the session - this data is saved on the users browser
const User = require( "../models/User" )
const bcrypt = require( "bcrypt" )

module.exports = function userLogin( req, res ) {
  const { password, username } = req.body
  User.findOne( { username: username }, ( error, user ) => {
    if( user ) {
      bcrypt.compare( password, user.password, ( error, same ) => {
        if( same ) {
          // store user session
          // now each time user makes a request this cookie is sent to server with authentication id
          req.session.userId = user._id
          req.session.userType = user.userType
          if( user.userType === "Driver" ) {
            res.redirect( "/driver/dashboard" )
          } else if( user.userType === "Instructor" ) {
            res.redirect( "/login" )
            // todo: redirect to first page the 'Instructor' user should see
          } else if( user.userType === "Admin" ) {
            res.redirect( "/login" )
            // todo: redirect to first page the 'Admin' user should see
          }
        } else {
          res.redirect( "/login" )
        }
      } )
    } else {
      res.redirect( "/login" )
    }
  } )
}
