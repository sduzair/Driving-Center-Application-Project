module.exports = ( req, res ) => {
  const data = req.flash( 'data' )[ 0 ]
  res.render( "admin/appointment_page", {
    serverMsgs: req.flash( 'serverMsgs' ),
    errors: req.flash( 'validationErrors' ),
    data: data
  } )
}
