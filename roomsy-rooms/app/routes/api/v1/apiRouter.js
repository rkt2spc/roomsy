var express     = require('express');
var apiRouter   = express.Router();

//------------------------------------------------------------------------
// API endpoints
var roomsRouter     = require('./endpoints/rooms');
var roomtypesRouter = require('./endpoints/roomtypes');

//------------------------------------------------------------------------
// Mount API endpoints on router
apiRouter.use('/rooms', roomsRouter);
apiRouter.use('/roomtypes', roomtypesRouter);

//------------------------------------------------------------------------
// Exports
module.exports = apiRouter;