const express = require("express");
const router = express.Router();
const {
	createDoctor,
	retrieveDoctors,
	retrieveOneDoctor,
	updateOneDoctor,
} = require("../controllers/doctors.controllers");
const advancedResults = require("../middlewares/advancedResult");
const Doctors = require("../models/Doctors");

router.post("/", createDoctor);
router.get("/", advancedResults(Doctors), retrieveDoctors);
router.get("/:id", retrieveOneDoctor);
router.put("/:id", updateOneDoctor);

module.exports = router;
