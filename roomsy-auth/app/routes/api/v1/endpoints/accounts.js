var express = require('express');
var accountsRouter = express.Router();

//------------------------------------------------------------------------
// Models
var Account = Utils.getModel('Account');

//------------------------------------------------------------------------
// API paths
accountsRouter.post('/', (req, res, next) => {

    Account
        .find({username: req.body.username})
        .exec((err, accounts) => {

            if (err) return next(err);
            if (accounts.length) {
                //username exists
                return res.status(409).json({message: 'username already exists'});
            }

            var account = new Account({
                username: req.body.username,
                passwordHash: Account.generateHash(req.body.password)
            });

            account.save((err) => {
                
                if (err) return next(err);
                res.status(200).json({message: 'account created', accountId: account._id});
            });
        });
});

//------------------------------------------------------------------------
// Exports
module.exports = accountsRouter;