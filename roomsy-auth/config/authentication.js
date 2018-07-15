var passport = require('passport'),
    jwt = require('jsonwebtoken'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    Account = Utils.getModel('Account');

//------------------------------------------------------------------------
var authConfig = {
	algorithm: 'HS256',
	secret: Utils.getSecret().jwtKey
};

//------------------------------------------------------------------------
passport.use('jwt', new JwtStrategy({
        secretOrKey: authConfig.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        algorithms: [authConfig.algorithm]
    },
    function(jwt_payload, done) {

        Account.findById(jwt_payload.userId, function(err, account) {
            if (err) return done(err);
            if (!account) return done(null, false, 'invalid Token');
            return done(null, account, 'valid Token');
        });
    })
);

//------------------------------------------------------------------------
module.exports = {
    config: authConfig,
    verifyAPIKey: function(req, res, next) {
        var apiKey = Utils.getSecret().apiKey;
        if (req.query.apikey !== apiKey && req.body.apikey !== apiKey)
            return res.status(401).json({message: 'invalid api-key'});
        next();
    },
    authenticate: function(req, res, next) {

        if (!req.headers.authorization)
            return res.status(400).json({message: 'missing token'});

        passport.authenticate('jwt', (err, account, infoMessage) => {

            if (err) return next(err);
            if (!account) return res.status(401).json({message: 'invalid token'});

            req.authInfo = {
                message: infoMessage,
                account: account
            };
            next();

        })(req, res, next);
    },
    createToken: function(account) {
        var payload = { userId: account._id };
        var token = jwt.sign(payload, authConfig.secret, { algorithm: authConfig.algorithm });
        return token;
    }
}