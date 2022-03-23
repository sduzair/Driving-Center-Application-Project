module.exports = ( req, res ) => {
  res.render( "signup", {
    errors: req.flash( 'validationErrors' ),
  } )
} 
