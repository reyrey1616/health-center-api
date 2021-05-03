const express = require("express");
const router = express.Router();
const {
	createAppointment,
	retrieveAppointments,
	retrieveOneAppointment,
	updateOneAppointment,
	retrieveAppointmentsByPatient,
} = require("../controllers/appointment.controllers");
const advancedResults = require("../middlewares/advancedResult");
const Appointments = require("../models/Appointments");

router.post("/:scheduleId/:patientId", createAppointment);

router.get("/", advancedResults(Appointments), retrieveAppointments);

router.get("/:id", retrieveOneAppointment);

router.put("/:id", updateOneAppointment);

router.get("/patient/:id", retrieveAppointmentsByPatient);

module.exports = router;
