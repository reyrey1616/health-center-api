const ErrorResponse = require("../utils/ErrorResponse");
const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	console.log(err);
	error.message = err.message;

	// Mongoose bad objectId
	if (err.name === "CastError") {
		const message = `Resource not found`;
		error = new ErrorResponse(message, 404);
	}

	//   Mongoose duplicate key error
	if (err.code === 11000) {
		const message = "Duplicate value entered";
		error = new ErrorResponse(message, 400);
	}

	//   Mongoose validation error
	if (err.name === "ValidationError") {
		const message = Object.values(err.errors).map((val) => val.message);
		error = new ErrorResponse("ValidationError " + message, 400);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || "Error Handler: Internal Server Error",
	});
};

module.exports = errorHandler;
