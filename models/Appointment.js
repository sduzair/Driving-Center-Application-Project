const mongoose = require( "mongoose" )

const AppointmentSchema = new mongoose.Schema( {
  appointmentTime: {
    required: [ true, 'Please provide appointment time' ],
    type: String,
  },
  appointmentDate: {
    required: [ true, 'Please provide appointment date' ],
    type: String,
  }
},
  { timestamps: true } )

AppointmentSchema.pre( 'create', function( next ) {
  this.options.runValidators = true
  next()
} )

const Appointment = mongoose.model( "Appointment", AppointmentSchema )

module.exports = Appointment
