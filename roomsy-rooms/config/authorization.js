//------------------------------------------------------------------------
// Exports
module.exports = {
    extractAuthorizationInfo: function(req, res, next) {
        
        try {

            if (!req.headers.authorization)
                return res.status(401).json({message: 'missing authorization info'});

            var authorizationInfo = JSON.parse(
                Buffer.from(req.headers.authorization, 'base64').toString()
            );

            if (!authorizationInfo.user || !authorizationInfo.user._id)
                return res.status(400).json({message: 'malformatted authorization info'});

            req.authorizationInfo = authorizationInfo;
            next();
        }
        catch(e) { next(e); }
    }
};