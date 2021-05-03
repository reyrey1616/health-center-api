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
		consultationRecord: {
			type: Schema.Types.ObjectId,
			ref: "ConsultationRecords",
		},

		queueNumber: Number,

		type: {
			type: String,
			required: [true, "Consultation type is required"],
		},

		consultationForm: Object,

		appointmentDate: {
			type: Date,
		},
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
