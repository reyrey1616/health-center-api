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

		nextSlotToGive: {
			type: Number,
			default: 1,
		},
		startStatus: {
			type: String,
			enum: ["Pending", "Started", "Done"],
			default: "Pending",
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
		timestamps: true,
	}
);

module.exports = Schedules = mongoose.model("Schedules", ScheduleSchema);
