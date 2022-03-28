// at the current stage only users of user type 'Driver' are able to login and access the driver dashboard
const User = require( "../models/User" )
const bcrypt = require( "bcryptjs" )

module.exports = function userLogin( req, res ) {
  const { password, username } = req.body
  User.findOne( { username: username }, ( error, user ) => {
    if( error ) {
      req.flash( 'validationErrors', error.errors
        ? Object.keys( error.errors ).map( key => error.errors[ key ].message )
        : [ "Unable to login" ] )
      res.redirect( "/login" )
    }
    else {
      if( user ) {
        bcrypt.compare( password, user.password, ( error, same ) => {
          if( error ) {
            req.flash( 'validationErrors', [ "Unable to check password" ] )
            res.redirect( "/login" )
          }
          else {
            if( same ) {
              // store user session
              // now each time user makes a request this cookie is sent to server with authentication id
              req.session.userId = user._id
              req.session.userType = user.userType
              if( user.userType === "Driver" ) {
                req.flash( 'serverMsgs', [ "Welcome to the driver dashboard" ] )
                res.redirect( "/driver/dashboard" )
              } else if( user.userType === "Examiner" ) {
                req.flash( 'validationErrors', [ "Examiner user does not have access yet" ] )
                res.redirect( '/' )
                // todo: redirect to first page the 'Instructor' user should see
              } else if( user.userType === "Admin" ) {
                req.flash( 'serverMsgs', [ "Welcome to the admin dashboard" ] )
                res.redirect( '/admin/dashboard' )
              }
            } else {
              req.flash( 'validationErrors', [ "Incorrect username/password" ] )
              res.redirect( "/login" )
            }
          }
        } )
      } else {
        req.flash( 'validationErrors', [ "Signup first to login" ] )
        res.redirect( "/signup" )
      }
    }

  } )
}
