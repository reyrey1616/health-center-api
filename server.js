// IMPORTS
const colors = require("colors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const app = require("./config/app");

// Environment Variables
dotenv.config({ path: "./config/config.env" });

// Connect to Database
connectDB();
require("./config/app");

// Set the Server Port
const PORT = process.env.PORT || 5001;

// Set the server to listen to the Port 5000 and log if running
const server = app.listen(PORT, () =>
	console.log(
		`SERVER RUNNING ${process.env.NODE_ENV} ON PORT ${process.env.PORT}`
			.green.inverse
	)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
	console.log(`Error unhandled rejection: ${err.message}`.red);
	//close server and exit process
	server.close(() => process.exit(1));
});

// Handle uncaught exception
process.on("uncaughtException", (err, promise) => {
	console.log(`Error uncaught exception: ${err.message}`.red);
	//close server and exit process
	server.close(() => process.exit(1));
});
