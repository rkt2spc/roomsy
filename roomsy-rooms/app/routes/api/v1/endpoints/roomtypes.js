var express = require('express');
var roomTypesRouter = express.Router();

//------------------------------------------------------------------------
// Models
var RoomType = Utils.getModel('RoomType');

//------------------------------------------------------------------------
// Validator
var validator = Utils.getValidator('roomTypes');

//------------------------------------------------------------------------
// API paths
roomTypesRouter.get('/', validator.validateGetRequest, (req, res, next) => {

	RoomType
		.find({propertyId: req.query.propertyId})
		.exec((err, roomTypes) => {

			if (err) return next(err);
			res.status(200).json({roomTypes: roomTypes});
		});
});

roomTypesRouter.get('/:roomTypeId', validator.validateGetSingleRequest, (req, res, next) => {

	RoomType
		.findById(req.params.roomTypeId)
		.exec((err, roomType) => {

			if (err) return next(err);
			if (!roomType) return res.status(404).json({message: 'can\'t find any roomType by provided id'});
			res.status(200).json({roomType: roomType});
		});
});

roomTypesRouter.post('/', validator.validatePostRequest, (req, res, next) => {

	var roomType = new RoomType(req.body);
	roomType.save((err) => {

		if (err) return next(err);
		res.status(200).json({roomTypeId: "/api/roomTypes/" + roomType._id});
	});
});

roomTypesRouter.put('/:roomTypeId', validator.validatePutRequest, (req, res, next) => {

	RoomType
		.findById(req.params.roomTypeId)
		.exec((err, roomType) => {
			if (err) return next(err);
			if (!roomType) return res.status(404).json({message: 'can\'t find any roomType by provided id'});

			Object.assign(roomType, req.body);
			roomType.save((err) => {
				if (err) return next(err);
				res.status(200).json({roomTypeId: '/api/roomTypes/' + roomType._id});
			});
		});
});

roomTypesRouter.delete('/:roomTypeId', validator.validateDeleteRequest, (req, res, next) => {

	RoomType
		.findById(req.params.roomTypeId)
		.exec((err, roomType) => {
			if (err) return next(err);
			if (!roomType) return res.status(404).json({message: 'can\'t find any roomType by provided id'});
			
			roomType.remove((err) => {
				if (err) return next(err);
				res.status(200).json({message: 'removed'});
			});
		});
});

//------------------------------------------------------------------------
// Exports
module.exports = roomTypesRouter;