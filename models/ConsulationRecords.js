const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ConsulationRecordsSchema = new Schema(
	{
		patient: {
			type: Schema.Types.ObjectId,
			ref: "Patients",
		},
		consultationSchedule: {
			type: Schema.Types.ObjectId,
			ref: "Schedules",
		},
		appointment: {
			type: Schema.Types.ObjectId,
			ref: "Appointments",
		},
		type: {
			type: String,
			required: [true, "Type of consulation is required"],
		},

		appointmentDate: Date,
		appointmentTime: Date,

		// Queue Number
		queueNumber: String,

		conducted: {
			type: Boolean,
			default: false,
		},

		conductedtDate: Date,
		conductedtTime: Date,

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
		timestamps: true,
	}
);

module.exports = ConsultationRecords = mongoose.model(
	"ConsultationRecords",
	ConsulationRecordsSchema
);
