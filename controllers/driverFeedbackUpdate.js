const Driver = require( "../models/Driver" )

module.exports = function( req, res ) {
    const { _id, examinerComment, testResult } = req.body
    const update = {
        examinerComment: examinerComment,
        testResult: testResult
    }
    console.log( req.body )
    Driver.findOneAndUpdate( { _id: _id }, update, {
        new: true,
    }, ( err, driver ) => {
        if( err || !driver ) {
            req.flash( 'validationErrors', err?.errors
                ? Object.keys( err.errors ).map( key => err.errors[ key ].message )
                : [ "Unable to update examiner's feedback." ] )

        } else {
            console.log( "Driver's examiner's feedback updated successfully" )
            req.flash( 'serverMsgs', [ "Examiner's feedback is updated successfully." ] )
        }
        res.redirect( "/examiners/appointments-page" )
    } )
}
