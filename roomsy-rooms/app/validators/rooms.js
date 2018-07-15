var ROOM_VALIDATION_SCHEMA = {
    'name'              : { notEmpty: true },
    'type'              : { notEmpty: true, isMongoId: true },
    'status'            : { notEmpty: true },

    'propertyId'        : { notEmpty: true }
};

exports.validateGetRequest = function(req, res, next) {

    req.checkQuery('propertyId').notEmpty();

    req.getValidationResult().then((result) => {
        if (result.isEmpty()) return next();
        res.status(400).json({message: 'validation error', error: result.array()});
    });
};

exports.validatePostRequest = function(req, res, next) {

    req.checkBody(ROOM_VALIDATION_SCHEMA);

    req.getValidationResult().then((result) => {
        if (result.isEmpty()) return next();
        res.status(400).json({message: 'validation error', error: result.array()});
    });
};

exports.validatePutRequest = function(req, res, next) {

    req.checkParams('roomId').notEmpty().isMongoId();
    req.checkBody(ROOM_VALIDATION_SCHEMA);

    req.getValidationResult().then((result) => {
        if (result.isEmpty()) return next();
        res.status(400).json({message: 'validation error', error: result.array()});
    });
};

exports.validateDeleteRequest = function(req, res, next) {

    req.checkParams('roomId').notEmpty().isMongoId();

    req.getValidationResult().then((result) => {
        if (result.isEmpty()) return next();
        res.status(400).json({message: 'validation error', error: result.array()});
    });
};