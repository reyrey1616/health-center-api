const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AppointmentSchema = new Schema(
	{
		schedule: {
			type: Schema.Types.ObjectId,
			ref: "Schedules",
		},
		patient: {
			type: Schema.Types.ObjectId,
			ref: "Patients",
		},

		queueNumber: Number,

		appointmentStatus: {
			type: String,
			enum: ["Pending", "Attended", "Cancelled"],
		},

		status: {
			type: Boolean,
			default: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

module.exports = Appointments = mongoose.model(
	"Appointments",
	AppointmentSchema
);
