var mongoose = require('mongoose');

//------------------------------------------------------------------------
// Reference Schema
// var roomTypeSchema       = Utils.getModelSchema('Booking/BookingInfo');

//------------------------------------------------------------------------
// Validator
// var validator = Utils.getValidator('booking');

//------------------------------------------------------------------------
// Schema definition
var roomSchema = mongoose.Schema({
    
    name            : { type: String, required: true },
    type            : { type: mongoose.Schema.Types.ObjectId, ref: 'RoomType' },
    status          : { type: String, enum: ['CLEAN', 'DIRTY'], default: 'CLEAN' },

    propertyId      : { type: String, required: true }
});

//------------------------------------------------------------------------
// Exports
module.exports = {
    
    Schema: roomSchema,
    Model: mongoose.model('Room', roomSchema)
};