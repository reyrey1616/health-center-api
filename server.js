// IMPORTS
const colors = require("colors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const app = require("./config/app");
var axios = require("axios").default;

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

// var options = {
// 	method: "POST",
// 	url: "https://clicksend.p.rapidapi.com/sms/send",
// 	headers: {
// 		"content-type": "application/json",
// 		authorization: "Basic a29sZW50YWJzQGdtYWlsLmNvbTpDb2xsZWVuMTIzQA==",
// 		"x-rapidapi-key": "66f1f0c9f8mshb5406ad89911fb6p113c85jsn16798b95eeb4",
// 		"x-rapidapi-host": "clicksend.p.rapidapi.com",
// 	},
// 	data: {
// 		messages: [
// 			{
// 				source: "mashape",
// 				from: "Test",
// 				body: `Current number on Queue: 2 \n
// 					   Your Queue number: 4 \n
// 					   Please prepare.
// 				\n
// 				- Health Center Management System
// 				\n
// 				Please do not reply.
// 				`,
// 				to: "+639182254329",
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
