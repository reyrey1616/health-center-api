const express = require("express");
const router = express.Router();
const {
	createPatient,
	retrievePatients,
	retrieveOnePatient,
	updateOnePatient,
} = require("../controllers/patient.controllers");
const advancedResults = require("../middlewares/advancedResult");
const Patients = require("../models/Patients");

router.post("/", createPatient);
router.get("/", advancedResults(Patients), retrievePatients);
router.get("/:id", retrieveOnePatient);
router.put("/:id", updateOnePatient);

module.exports = router;
