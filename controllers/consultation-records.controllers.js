const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const Consulation = require("../models/ConsulationRecords");

exports.createConsulationRecord = asyncHandler(async (req, res, next) => {
	const doc = await Consulation.create(req.body);
	req.body.image = req.body.fileName;
	res.status(201).json({ success: true, data: doc });
});

exports.retrieveConsulationRecords = asyncHandler(async (req, res, next) => {
	const doc = await Consulation.find({ status: true }).sort("-createdAt");

	res.status(200).json({
		success: true,
		count: doc.length,
		data: doc,
	});
});

exports.retrieveOneConsulationRecord = asyncHandler(async (req, res, next) => {
	const doc = await Consulation.findById(req.params.id);

	if (!doc) {
		return next(
			new ErrorResponse(
				`Consulation not found with ID of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({ success: true, data: doc });
});

exports.updateOneConsulationRecord = asyncHandler(async (req, res, next) => {
	let doc = await Consulation.findById(req.params.id);

	if (!doc) {
		return next(
			new ErrorResponse(
				`Consulation not found with ID of ${req.params.id}`,
				404
			)
		);
	}

	const updateDoc = await Consulation.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			runValidators: true,
			new: true,
		}
	);

	res.status(200).json({ success: true, data: updateDoc });
});
