module.exports = ( req, res ) => {
  res.render( 'admin/test-results', {
    driversObj: null,
    serverMsgs: null,
    errors: null
  } )
}
