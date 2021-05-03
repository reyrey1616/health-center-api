const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const AdminSchema = new Schema(
	{
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Please add a valid email",
			],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			select: false,
		},
		image: String,
		fname: {
			type: String,
			required: [true, "Firstname is required!"],
			trim: true,
		},
		mname: {
			type: String,
			required: [true, "Middlename is required!"],
			trim: true,
		},
		lname: {
			type: String,
			required: [true, "Lastname is required!"],
			trim: true,
		},
		gender: {
			type: String,
			enum: ["Male", "Female"],
		},
		phoneNumber: String,

		address: String,
		brgy: String,
		city_municipality: String,
		province: String,

		familyPlanningData: {},
		obstetricData: {},
		individualTreatmentData: {},
		cancerControlData: {},
		nutritionistData: {},

		status: {
			type: Boolean,
			default: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		role: {
			type: String,
			default: "admin",
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Encrypt using bcrypt
AdminSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
AdminSchema.methods.getSignedJwtToken = function () {
	return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// Match user entered password to hash password in database
AdminSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = Admin = mongoose.model("Admin", AdminSchema);
