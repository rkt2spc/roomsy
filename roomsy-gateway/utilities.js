var path = require('path');

module.exports = {

    root_path: __dirname,

    //Functions
    app_path: function(subpath) {
        return path.join(this.root_path, 'app', subpath);  
    },

    getConfig: function(configName) {
        return require(
                path.join(root_path, 'config', configName);
            );
    },

    getModel: function(modelName) { //require the model in 'app/models'
        return require(
            this.app_path(
                path.join('models', modelName)
            ));
    },
    
    getRouter: function(routeName) { //require the route handler in 'app/routes'
        return require(
            this.app_path(
                path.join('routes', routeName)
            ));
    }
}


