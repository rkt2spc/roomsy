var express     = require('express');
var apiRouter   = express.Router();

//------------------------------------------------------------------------
// API endpoints
var accountsRouter  = require('./endpoints/accounts');
var authRouter      = require('./endpoints/auth');

//------------------------------------------------------------------------
// Mount API endpoints on router
apiRouter.use('/accounts', accountsRouter);
apiRouter.use('/auth', authRouter);

//------------------------------------------------------------------------
// Exports
module.exports = apiRouter;