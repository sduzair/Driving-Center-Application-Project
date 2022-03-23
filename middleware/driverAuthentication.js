// this authentication middleware only checks if user is a valid user present in 'Users' collection
// whether the user is of 'Driver', 'Admin' or 'Examiner' user type is checked in the controllers of the respective routes

const User = require( "../models/User" )

module.exports = ( req, res, next ) => {

  if( !req.session.userId ) {
    req.flash( 'validationErrors', [ "Login before accessing Driver portal" ] )
    return res.redirect( "/login" )
  }

  User.findById( req.session.userId, ( error, user ) => {
    if( error || !user ) {
      req.flash( 'validationErrors', error.errors
        ? Object.keys( error.errors ).map( key => error.errors[ key ].message )
        : [ "Unable to find user" ] )

      return res.redirect( "/login" )
    } else if( user.userType !== 'Driver' ) {
      req.flash( 'validationErrors', [ "Users other than driver do not have access" ] )
      return res.redirect( "/" )
    }
    next()
  } )
}
