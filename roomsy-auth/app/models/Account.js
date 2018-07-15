var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//------------------------------------------------------------------------
// Reference Schema

//------------------------------------------------------------------------
// Validator
// var validator = Utils.getValidator('booking');

//------------------------------------------------------------------------
// Schema definition
var accountSchema = mongoose.Schema({

    username        : { type: String, required: true, trim: true, unique: true, index: true },
    passwordHash    : { type: String, required: true },
    role            : { type: String, required: true, default: 'user' }
}, 
//Schema optioms
{
	timestamps: true
});

//------------------------------------------------------------------------
// Schema Methods 
// generating a hash
accountSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
accountSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

//------------------------------------------------------------------------
// Exports
module.exports = {
    Schema: accountSchema,
    Model: mongoose.model('Account', accountSchema)
}