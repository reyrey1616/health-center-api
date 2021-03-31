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
		type: {
			type: String,
			required: [true, "Type of consulation is required is required"],
		},

		appointmentDate: Date,
		appointmentTime: Date,

		// Queue Number
		queueNumber: String,
		conducted: {
			type: Boolean,
			default: false,
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

module.exports = ConsultationRecords = mongoose.model(
	"ConsultationRecords",
	ConsulationRecordsSchema
);
