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

// var options = {
// 	method: "POST",
// 	url: "https://clicksend.p.rapidapi.com/sms/send",
// 	headers: {
// 		"content-type": "application/json",
// 		authorization:
// 			"Basic ZGFiYm95cmV5QGdtYWlsLmNvbTpHZW5lcmF0ZTEyMkA=",
// 		"x-rapidapi-key":
// 			"ce0c090ed7msh4f59305a9b6f07ap14fbd6jsn8d230dc37091",
// 		"x-rapidapi-host": "clicksend.p.rapidapi.com",
// 	},
// 	data: {
// 		messages: [
// 			{
// 				source: "mashape",
// 				from: "CCMP Health Center Management System",
// 				body: `Current number on Queue: ${currentNumberInQueue} \n
// 				Your Queue number: ${queueNumber} \n
// 				Please prepare.
// 		 \n
// 		 - Health Center Management System
// 		 \n
// 		 Please do not reply.
// 		 `,
// 				to: `${phoneNumber}`,
// 				schedule: "1452244637",
// 				custom_string: "this is a test",
// 			},
// 		],
// 	},
// };

// axios
// 	.request(options)
// 	.then(function (response) {
// 		console.log(response.data);
// 	})
// 	.catch(function (error) {
// 		console.error(error);
// 	});
