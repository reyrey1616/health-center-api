const express = require("express");
const router = express.Router();
const {
	createAppointment,
	retrieveAppointments,
	retrieveOneAppointment,
	updateOneAppointment,
	retrieveAppointmentsByPatient,
} = require("../controllers/appointment.controllers");
// const { uploadSingle } = require("../middlewares/fileUpload");

router.post("/", createAppointment);
router.get("/", retrieveAppointments);
router.get("/patient/:id", retrieveAppointmentsByPatient);
router.get("/:id", retrieveOneAppointment);
router.put("/:id", updateOneAppointment);

module.exports = router;
