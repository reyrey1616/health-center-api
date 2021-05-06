const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const Doctors = require("../models/Doctors");

exports.createDoctor = asyncHandler(async (req, res, next) => {
	const doc = await Doctors.create(req.body);
	res.status(201).json({ success: true, data: doc });
});

exports.retrieveDoctors = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

exports.retrieveOneDoctor = asyncHandler(async (req, res, next) => {
	const doc = await Doctors.findById(req.params.id);

	if (!doc) {
		return next(
			new ErrorResponse(
				`Doctor not found with ID of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: doc });
});

exports.updateOneDoctor = asyncHandler(async (req, res, next) => {
	let doc = await Doctors.findById(req.params.id);

	if (!doc) {
		return next(
			new ErrorResponse(
				`Doctor not found with ID of ${req.params.id}`,
				404
			)
		);
	}

	const updateDoc = await Doctors.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			runValidators: true,
			new: true,
		}
	);

	res.status(200).json({ success: true, data: updateDoc });
});
