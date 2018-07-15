var mongoose = require('mongoose');

//------------------------------------------------------------------------
// Reference Schema
// None

//------------------------------------------------------------------------
// Validator
// None

//------------------------------------------------------------------------
// Schema definition
var roomTypeSchema = mongoose.Schema({
    
    name            : { type: String, required: true },
    acronym         : { type: String },
	capacity: {
        adults      : { type: Number },
        children    : { type: Number }
    },
    showOnWebsite   : { type: Boolean },
    description     : { type: String  },

    propertyId      : { type: String, required: true }
});

//------------------------------------------------------------------------
// Exports
module.exports = {
    
    Schema: roomTypeSchema,
    Model: mongoose.model('RoomType', roomTypeSchema)
};