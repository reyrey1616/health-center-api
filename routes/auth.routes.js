const express = require("express");
const router = express.Router();
const {
	login,
	getUserLoggedin,
	logout,
	register,
	getAdminLoggedin,
	adminRegister,
} = require("../controllers/auth.controllers");
const { protect } = require("../middlewares/auth");
const Patient = require("../models/Patients");
const AdminAccounts = require("../models/AdminAccounts");

// Student
router.post("/patient-login", login(Patient));
router.post("/register", register);
router.get("/get-patient", protect(Patient), getUserLoggedin(Patient));

// Evaluator
router.post("/admin-login", login(AdminAccounts));
router.post("/admin-register", adminRegister);
router.get(
	"/get-admin",
	protect(AdminAccounts),
	getAdminLoggedin(AdminAccounts)
);

router.get("/logout", logout);

module.exports = router;
