const User = require( "../models/User" )

module.exports = ( req, res, next ) => {

  console.log( "examinerAuthentication" )
  if( !req.session.userId ) {
    req.flash( 'validationErrors', [ "Login before accessing Examiner portal" ] )
    return res.redirect( "/login" )
  }

  User.findById( req.session.userId, ( error, user ) => {
    console.log( "user", user )
    if( error || !user ) {
      req.flash( 'validationErrors', error.errors
        ? Object.keys( error.errors ).map( key => error.errors[ key ].message )
        : [ "Unable to find user" ] )

      return res.redirect( "/login" )
    } else if( user.userType !== 'Examiner' ) {
      req.flash( 'validationErrors', [ "Users other than 'Examiner' do not have access" ] )
      return res.redirect( "/" )
    }
    next()
  } )
}
