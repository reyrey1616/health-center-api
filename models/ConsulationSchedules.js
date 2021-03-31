const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ScheduleSchema = new Schema(
	{
		type: {
			type: String,
			required: [true, "Type of consulation is required is required"],
		},

		title: String,
		description: String,
		healthWorker: String,
		numberOfSlot: Number,
		consultationDate: Date,
		consultationTime: Date,

		// QUEUEING NUMBER
		currentNumber: Number,
		isStarted: {
			type: Boolean,
			default: false,
		},

		appointedPatients: [
			{
				patient: {
					type: Schema.Types.ObjectId,
					ref: "Patients",
					required: [true, "Patient's Information is Required"],
				},
				queueNumber: {
					type: Number,
					required: [true, "Queue Number is Required"],
				},
			},
		],

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

module.exports = Schedules = mongoose.model("Schedules", ScheduleSchema);
