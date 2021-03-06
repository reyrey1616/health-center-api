const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const ConsultationSchedule = require("../models/ConsulationSchedules");

exports.createConsultationSchedule = asyncHandler(async (req, res, next) => {
	const doc = await ConsultationSchedule.create(req.body);
	req.body.image = req.body.fileName;
	res.status(201).json({ success: true, data: doc });
});

exports.retrieveConsultationSchedules = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

exports.retrieveConsultationsByDoctor = asyncHandler(async (req, res, next) => {
	const doc = await ConsultationSchedule.find({
		healthWorker: req.params.id,
	});

	res.status(200).json({ success: true, data: doc });
});

exports.retrieveOneConsultationSchedule = asyncHandler(
	async (req, res, next) => {
		const doc = await ConsultationSchedule.findById(req.params.id);

		if (!doc) {
			return next(
				new ErrorResponse(
					`Consultation Schedule not found with ID of ${req.params.id}`,
					404
				)
			);
		}
		res.status(200).json({ success: true, data: doc });
	}
);

exports.updateOneConsultationSchedule = asyncHandler(async (req, res, next) => {
	let doc = await ConsultationSchedule.findById(req.params.id);

	if (!doc) {
		return next(
			new ErrorResponse(
				`Consultation Schedule not found with ID of ${req.params.id}`,
				404
			)
		);
	}

	const updateDoc = await ConsultationSchedule.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			runValidators: true,
			new: true,
		}
	);

	doc = await ConsultationSchedule.findById(req.params.id).populate(
		"healthWorker"
	);

	res.status(200).json({ success: true, data: doc });
});
