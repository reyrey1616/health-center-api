const express = require("express");
const router = express.Router();
const {
	createConsultationSchedule,
	retrieveConsultationSchedules,
	retrieveOneConsultationSchedule,
	updateOneConsultationSchedule,
} = require("../controllers/consulation-schedules.controllers");
const advancedResults = require("../middlewares/advancedResult");
const Schedules = require("../models/ConsulationSchedules");

router.post("/", createConsultationSchedule);
router.get("/", advancedResults(Schedules), retrieveConsultationSchedules);
router.get("/:id", retrieveOneConsultationSchedule);
router.put("/:id", updateOneConsultationSchedule);

module.exports = router;
