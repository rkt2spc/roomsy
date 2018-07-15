var ROOMTYPE_VALIDATION_SCHEMA = {
    'name'              : { notEmpty: true },
    'acronym'           : { notEmpty: true },
	'capacity.adults'   : { notEmpty: true, isInt: {min: 0} },
	'capacity.children' : { notEmpty: true, isInt: {min: 0} },    
    'showOnWebsite'     : { notEmpty: true, isBoolean: true },
    'description'       : { notEmpty: true  },

    'propertyId'        : { notEmpty: true }
};

exports.validateGetRequest = function(req, res, next) {

    req.checkQuery('propertyId').notEmpty();

    req.getValidationResult().then((result) => {
        if (result.isEmpty()) return next();
        res.status(400).json({message: 'validation error', error: result.array()});
    });
};

exports.validateGetSingleRequest = function(req, res, next) {

    req.checkParams('roomTypeId').notEmpty().isMongoId();

    req.getValidationResult().then((result) => {
        if (result.isEmpty()) return next();
        res.status(400).json({message: 'validation error', error: result.array()});
    });
};

exports.validatePostRequest = function(req, res, next) {

    req.checkBody(ROOMTYPE_VALIDATION_SCHEMA);

    req.getValidationResult().then(function(result) {
        if (result.isEmpty()) return next();
        res.status(400).json({message: 'validation error', error: result.array()});
    });
};

exports.validatePutRequest = function(req, res, next) {

    req.checkParams('roomTypeId').notEmpty().isMongoId();
    req.checkBody(ROOMTYPE_VALIDATION_SCHEMA);

    req.getValidationResult().then((result) => {
        if (result.isEmpty()) return next();
        res.status(400).json({message: 'validation error', error: result.array()});
    });
};

exports.validateDeleteRequest = function(req, res, next) {

    req.checkParams('roomTypeId').notEmpty().isMongoId();

    req.getValidationResult().then((result) => {
        if (result.isEmpty()) return next();
        res.status(400).json({message: 'validation error', error: result.array()});
    });
};