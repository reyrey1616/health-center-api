const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const sendTokenResponse = require("../utils/sendTokenResponse");
const Patients = require("../models/Patients");
const AdminAccounts = require("../models/AdminAccounts");

//@desc  User Login
//@route POST /api/v1/auth/customer-login
//@access Public
exports.login = (model) =>
	asyncHandler(async (req, res, next) => {
		const { email, password } = req.body;

		// Validate email and password
		if (!email || !password) {
			return next(
				new ErrorResponse(
					"Please provide an email and password",
					400
				)
			);
		}

		//   Check for user
		let user = await model.findOne({ email }).select("+password");
		if (!user) {
			return next(new ErrorResponse("Email not found", 401));
		}

		//   Check if password matches
		const isMatch = await user.matchPassword(password);

		if (!isMatch) {
			return next(new ErrorResponse("Password not match", 401));
		}

		sendTokenResponse(user, 200, res, user.role);
	});

//@desc  Get User Info via token
exports.getUserLoggedin = (model) =>
	asyncHandler(async (req, res, next) => {
		const user = await model.findById(req.user.id);

		res.status(200).json({
			success: true,
			data: user,
		});
	});

//@desc  Get Admin Info via token
exports.getAdminLoggedin = (model) =>
	asyncHandler(async (req, res, next) => {
		const user = await model.findById(req.user.id);

		res.status(200).json({
			success: true,
			data: user,
		});
	});

// Patient Registration
exports.register = asyncHandler(async (req, res, next) => {
	let doc = await Patients.create(req.body);
	doc = await Patients.findById(doc._id);

	sendTokenResponse(doc, 200, res, doc.role);
});

// Admin Registration
exports.adminRegister = asyncHandler(async (req, res, next) => {
	let user = await AdminAccounts.create(req.body);

	sendTokenResponse(user, 200, res, user.role);
});

//@desc  Log user out / clear cookies
//@route GET /api/v1/auth/logout
//@access Private
exports.logout = asyncHandler(async (req, res, next) => {
	res.cookie("token", "none", {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});

	res.status(200).json({ success: true, data: {} });
});
