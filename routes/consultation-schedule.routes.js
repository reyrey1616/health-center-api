const express = require("express");
const router = express.Router();
const {
	createConsultationSchedule,
	retrieveConsultationSchedules,
	retrieveOneConsultationSchedule,
	updateOneConsultationSchedule,
} = require("../controllers/consulation-schedules.controllers");
// const { uploadSingle } = require("../middlewares/fileUpload");

router.post("/", createConsultationSchedule);
router.get("/", retrieveConsultationSchedules);
router.get("/:id", retrieveOneConsultationSchedule);
router.put("/:id", updateOneConsultationSchedule);

module.exports = router;
