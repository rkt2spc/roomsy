var express = require('express');
var roomsRouter = express.Router();

//------------------------------------------------------------------------
// Models
var Room = Utils.getModel('Room');

//------------------------------------------------------------------------
// Validator
var validator = Utils.getValidator('rooms');

//------------------------------------------------------------------------
// API paths
roomsRouter.get('/', validator.validateGetRequest, (req, res, next) => {

	Room
		.find({propertyId: req.query.propertyId})
		.exec((err, rooms) => {

			if (err) return next(err);
			res.status(200).json({rooms: rooms});
		});
});

roomsRouter.post('/', validator.validatePostRequest, (req, res, next) => {

	var room = new Room(req.body);
	room.save((err) => {
		if (err) return next(err);
		res.status(200).json({roomId: "/api/rooms/" + room._id});
	});
});

roomsRouter.put('/:roomId', validator.validatePutRequest, (req, res, next) => {
	
	Room
		.findById(req.params.roomId)
		.exec((err, room) => {
			if (err) return next(err);
			if (!room) return res.status(404).json({message: 'can\'t find any room by provided id'});

			Object.assign(room, req.body);
			room.save((err) => {
				if (err) return next(err);
				res.status(200).json({roomId: '/api/rooms/' + room._id});
			});
		});
});

roomsRouter.delete('/:roomId', validator.validateDeleteRequest, (req, res, next) => {

	Room
		.findById(req.params.roomId)
		.exec((err, room) => {
			if (err) return next(err);
			if (!room) return res.status(404).json({message: 'can\'t find any room by provided id'});
			
			room.remove((err) => {
				if (err) return next(err);
				res.status(200).json({message: 'removed'});
			});
		})
});

//------------------------------------------------------------------------
// Exports
module.exports = roomsRouter;