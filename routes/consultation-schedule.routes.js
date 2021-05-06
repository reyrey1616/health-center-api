const express = require("express");
const router = express.Router();
const {
	createConsultationSchedule,
	retrieveConsultationSchedules,
	retrieveOneConsultationSchedule,
	updateOneConsultationSchedule,
	retrieveConsultationsByDoctor,
} = require("../controllers/consulation-schedules.controllers");
const advancedResults = require("../middlewares/advancedResult");
const Schedules = require("../models/ConsulationSchedules");

router.post("/", createConsultationSchedule);
router.get(
	"/",
	advancedResults(Schedules, ["healthWorker"]),
	retrieveConsultationSchedules
);
router.get("/:id", retrieveOneConsultationSchedule);
router.put("/:id", updateOneConsultationSchedule);

router.put("/doctor/:id", retrieveConsultationsByDoctor);

module.exports = router;
