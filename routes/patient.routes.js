const express = require("express");
const router = express.Router();
const {
	createPatient,
	retrievePatients,
	retrieveOnePatient,
	updateOnePatient,
} = require("../controllers/patient.controllers");
// const { uploadSingle } = require("../middlewares/fileUpload");

router.post("/", createPatient);
router.get("/", retrievePatients);
router.get("/:id", retrieveOnePatient);
router.put("/:id", updateOnePatient);

module.exports = router;
