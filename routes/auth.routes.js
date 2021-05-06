const express = require("express");
const router = express.Router();
const {
	login,
	getUserLoggedin,
	logout,
	register,
	getAdminLoggedin,
	adminRegister,
	doctorRegister,
} = require("../controllers/auth.controllers");
const { protect } = require("../middlewares/auth");
const Patient = require("../models/Patients");
const AdminAccounts = require("../models/AdminAccounts");
const Doctors = require("../models/Doctors");

// Patient
router.post("/patient-login", login(Patient));
router.post("/patient-register", register);
router.get("/get-patient", protect(Patient), getUserLoggedin(Patient));

// Admin/Secretary
router.post("/admin-login", login(AdminAccounts));
router.post("/admin-register", adminRegister);
router.get(
	"/get-admin",
	protect(AdminAccounts),
	getAdminLoggedin(AdminAccounts)
);

// Doctor
router.post("/doctor-login", login(Doctors));
router.post("/doctor-register", doctorRegister);
router.get("/get-doctor", protect(Doctors), getAdminLoggedin(Doctors));

router.get("/logout", logout);

module.exports = router;
