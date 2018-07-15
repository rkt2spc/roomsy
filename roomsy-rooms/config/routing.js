var express = require('express');

//------------------------------------------------------------------------
var apiRouter = Utils.getRouter('api');

//------------------------------------------------------------------------
var appRouter = express.Router();
appRouter.use('/api', 
	App.authentication.verifyApiKey,
	apiRouter);
appRouter.get('/', (req, res) => {res.end('roomsy-rooms is online')});

//------------------------------------------------------------------------
var configObject = {
	
	appRouter: appRouter
};

//------------------------------------------------------------------------
module.exports =  configObject;