const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const Appointment = require("../models/Appointments");

exports.createAppointment = asyncHandler(async (req, res, next) => {
	const doc = await Appointment.create(req.body);
	req.body.image = req.body.fileName;
	res.status(201).json({ success: true, data: doc });
});

exports.retrieveAppointments = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

exports.retrieveAppointmentsByPatient = asyncHandler(async (req, res, next) => {
	const doc = await Appointment.find({
		status: true,
		patient: req.params.id,
	}).sort("-createdAt");

	res.status(200).json({
		success: true,
		count: doc.length,
		data: doc,
	});
});

exports.retrieveOneAppointment = asyncHandler(async (req, res, next) => {
	const doc = await Appointment.findById(req.params.id);

	if (!doc) {
		return next(
			new ErrorResponse(
				`Appointment not found with ID of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: doc });
});

exports.updateOneAppointment = asyncHandler(async (req, res, next) => {
	let doc = await Appointment.findById(req.params.id);

	if (!doc) {
		return next(
			new ErrorResponse(
				`Appointment not found with ID of ${req.params.id}`,
				404
			)
		);
	}

	const updateDoc = await Appointment.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			runValidators: true,
			new: true,
		}
	);

	res.status(200).json({ success: true, data: updateDoc });
});
