// this authentication middleware only checks if user is a valid user present in 'Users' collection
// whether the user is of 'Driver', 'Admin' or 'Examiner' user type is checked in the controllers of the respective routes

const User = require( "../models/User" )

module.exports = ( req, res, next ) => { 
  User.findById(req.session.userId, (error, user) => {
    if( error || !user ) {
      return res.redirect( "/login" )
    } else if( user.userType !== 'Driver' ) {
      return res.redirect( "/login" )
    }
    next() 
  })
}
