module.exports = function( req, res ) {
    res.render( "examiner/dashboard", {
        errors: null,
        serverMsgs: req.flash( "serverMsgs" ),
    } )
}

