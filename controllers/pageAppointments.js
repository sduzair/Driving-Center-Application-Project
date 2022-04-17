module.exports = function( req, res ) {
  res.render( "examiner/appointments", {
    errors: null,
    serverMsgs: null,
  } )
}
