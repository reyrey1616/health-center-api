const mongoose = require("mongoose");
const connectDB = async () => {
	const conn = await mongoose.connect(process.env.LOCAL_MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});

	console.log(
		`Mongo DB Connected: ${conn.connection.host}: ${process.env.LOCAL_MONGO_URI}`
			.cyan.inverse.bold
	);
};

module.exports = connectDB;
