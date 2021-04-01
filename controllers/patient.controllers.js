const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const Patient = require("../models/Patients");

exports.createPatient = asyncHandler(async (req, res, next) => {
	const doc = await Patient.create(req.body);
	req.body.image = req.body.fileName;
	res.status(201).json({ success: true, data: doc });
});

exports.retrievePatients = asyncHandler(async (req, res, next) => {
	const doc = await Patient.find({ status: true }).sort("-createdAt");

	res.status(200).json({
		success: true,
		count: doc.length,
		data: doc,
	});
});

exports.retrieveOnePatient = asyncHandler(async (req, res, next) => {
	const doc = await Patient.findById(req.params.id);

	if (!doc) {
		return next(
			new ErrorResponse(
				`Patient not found with ID of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: doc });
});

exports.updateOnePatient = asyncHandler(async (req, res, next) => {
	let doc = await Patient.findById(req.params.id);

	if (!doc) {
		return next(
			new ErrorResponse(
				`Patient not found with ID of ${req.params.id}`,
				404
			)
		);
	}

	const updateDoc = await Patient.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			runValidators: true,
			new: true,
		}
	);

	res.status(200).json({ success: true, data: updateDoc });
});
