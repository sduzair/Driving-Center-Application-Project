module.exports = ( req, res ) => {
  res.render( "admin/appointment_page", {
    serverMsgs: req.flash( 'serverMsgs' ),
    errors: req.flash( 'validationErrors' ),
  } )
}
