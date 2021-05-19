const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const Appointment = require("../models/Appointments");
const Patient = require("../models/Patients");
const Schedule = require("../models/ConsulationSchedules");

exports.createAppointment = asyncHandler(async (req, res, next) => {
	const { scheduleId, patientId } = req.params;
	const patient = await Patient.findById(patientId);

	if (!patient) {
		return next(
			new ErrorResponse(
				"Error creating appointment: User information not found",
				404
			)
		);
	}

	const schedule = await Schedule.findById(scheduleId);

	if (!schedule) {
		return next(
			new ErrorResponse(
				"Error creating appointment: Appointment Schedule information not found",
				404
			)
		);
	}

	const { nextSlotToGive, numberOfSlot } = await schedule;
	if (nextSlotToGive > numberOfSlot) {
		return next(
			new ErrorResponse(
				"Error creating appointment: This Appointment is Already Occupied",
				401
			)
		);
	}
	const queueNumber = nextSlotToGive;

	await Schedule.findByIdAndUpdate(scheduleId, {
		nextSlotToGive: queueNumber + 1,
	});

	const dataToSave = {
		schedule: schedule._id,
		patient: patient._id,
		queueNumber,
		type: req.body.type,
		consultationForm: req.body,
		appointmentStatus: "Pending",
	};

	const {
		fname,
		mname,
		lname,
		birthdate,
		educationalAttainment,
		occupation,
		phoneNumber,
		address,
		street,
		brgy,
		city_municipality,
		province,
		civilStatus,
		religion,
		philHealthNumber,
		type,
	} = req.body;

	const patientInfo = {
		fname,
		mname,
		lname,
		birthdate,
		educationalAttainment,
		occupation,
		phoneNumber,
		address,
		street,
		brgy,
		city_municipality,
		province,
		civilStatus,
		religion,
		philHealthNumber,
	};

	if (type === "Family Planning") {
		patientInfo.familyPlanning = req.body;
	} else if (type === "Obstetric and Gynecological") {
		patientInfo.obstetric = req.body;
	} else if (type === "Individual Treatment") {
		patientInfo.individualTreatment = req.body;
	} else if (type === "Cancer Control and Prevention Program") {
		patientInfo.cancerControl = req.body;
	} else if (type === "Nutritionist") {
		patientInfo.nutritionist = req.body;
	}

	await Patient.findByIdAndUpdate(patientId, patientInfo);

	const doc = await Appointment.create(dataToSave);

	res.status(201).json({ success: true, data: doc });
});

exports.retrieveAppointments = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

exports.retrieveAppointmentsByPatient = asyncHandler(async (req, res, next) => {
	const doc = await Appointment.find({
		status: true,
		patient: req.params.id,
	})
		.sort("-createdAt")
		.populate({
			path: "schedule",
			populate: {
				path: "healthWorker",
			},
		});

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

	console.log(req.body);
	console.log(req.params.id);

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
