//------------------------------------------------------------------------
// Node dependencies
var path = require('path');
var http = require('http');

//------------------------------------------------------------------------
// External dependencies
var express     = require('express');
var morgan      = require('morgan');
var bodyParser  = require('body-parser');
var expressValidator    = require('express-validator');

//------------------------------------------------------------------------
//Configurations
global.Utils = require('./utilities');
global.Configs = {
    env             : process.env.NODE_ENV,
    port            : process.env.PORT,
    apiKey          : process.env.API_KEY,
    databaseUrl     : process.env.DATABASE_URL
};
global.App = {};
App.expressApp      = express();
App.authentication  = Utils.getConfig('authentication');
App.authorization   = Utils.getConfig('authorization');
App.database        = Utils.getConfig('database');
App.errorHandling   = Utils.getConfig('errorHandling');
App.routing         = Utils.getConfig('routing');
App.validation      = Utils.getConfig('validation');

//------------------------------------------------------------------------
// Middlewares stack
var app = App.expressApp;
app.use(morgan('dev'));
app.use(express.static(path.join(Utils.root_path, 'public', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator(App.validation));
app.use(App.routing.appRouter);
app.use(App.errorHandling.handler);

//------------------------------------------------------------------------
// Exports
module.exports = {
	start: function() {
        App.database.connect(function(err) {
            
            if (err) return;
            http.createServer(App.expressApp).listen(Configs.port, function() {
                console.log('Server listening at port', Configs.port);
            });
        });
	}
};
