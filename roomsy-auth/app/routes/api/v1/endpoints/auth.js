var express = require('express');
var authRouter = express.Router();

//------------------------------------------------------------------------
// Models
var Account = Utils.getModel('Account');

//------------------------------------------------------------------------
// Configurations
var auth = Utils.getConfig('authentication');

//------------------------------------------------------------------------
// API paths
authRouter.post('/login', (req, res, next) => {

    Account
        .findOne({username: req.body.username})
        .exec((err, account) => {

            if (err) return next(err);
            if (!account) {
                // Account doesnt exists
                return res.status(404).json({message: 'can\'t find any accounts with provided username'});
            }

            if (!account.validPassword(req.body.password)) {
                // Wrong password
                return res.status(401).json({message: 'incorrect password'});
            }

            var token = auth.createToken(account);
            res.status(200).json({message: 'ok', token: token});
        });
});

authRouter.get('/resolvetoken', auth.authenticate, (req, res, next) => {

    var authInfo = req.authInfo;

    // Morph Mongoose Object to Clean Javascript Object, remove security credentials
    var account = authInfo.account.toObject();
    delete account.passwordHash;

    //
    res.status(200).json({message: authInfo.message, account: account});   
});

//------------------------------------------------------------------------
// Exports
module.exports = authRouter;