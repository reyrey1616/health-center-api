// IMPORTS
const express = require("express");
const colors = require("colors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const path = require("path");
const errorHandler = require("../middlewares/errorHandler");

// Initialize the App/Express
const app = express();
// const request = require(app);

// Enable CROSS ORIGIN RESOURCE SHARING
app.use(
	cors({
		origin: "*",
	})
);

// Routes Import

// INITIALIZATIONS
// Http body parser
app.use(bodyParser.json({ extended: true }));

// File upload package
// app.use(fileUpload());

app.use(express.static(path.join(__dirname, "../", "uploads")));

// Rate limiting | to limit the number of API request of a single IP
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, //10 mins
	max: 100,
});

app.use(limiter);

// Prevent HTTP Param pollution
app.use(hpp());

// Mongo Sanitize data
app.use(mongoSanitize());

// Too prevent cross site scripting/XSS
app.use(xss());

// Set security headers
app.use(helmet());

// Dev console logging middlewares
// if (process.env.NODE_ENV === 'development') {
// 	app.use(morgan('tiny'));
// }
app.use(morgan("tiny"));

// MOUNT routers

// Initialized Error Handler
app.use(errorHandler);

module.exports = app;
