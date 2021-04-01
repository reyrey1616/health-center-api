const express = require("express");
const router = express.Router();
const {
	createConsulationRecord,
	retrieveConsulationRecords,
	retrieveOneConsulationRecord,
	updateOneConsulationRecord,
} = require("../controllers/consultation-records.controllers");
// const { uploadSingle } = require("../middlewares/fileUpload");

router.post("/", createConsulationRecord);
router.get("/", retrieveConsulationRecords);
router.get("/:id", retrieveOneConsulationRecord);
router.put("/:id", updateOneConsulationRecord);

module.exports = router;
