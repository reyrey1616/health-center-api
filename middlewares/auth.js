const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");

exports.protect = (model) =>
	asyncHandler(async (req, res, next) => {
		let token;
		// If no cookie. the auth middleware will find the token in authorization header
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];
		} else {
			token = false;
		}
		// If using cookies. if the token is stored in cookies then will assign it to token and use every request
		// else if (req.cookies.token) {
		// 	token = req.cookies.token;
		// }

		//   Make sure token exists
		if (!token) {
			return next(
				new ErrorResponse(
					"Not authorized to access this route",
					401
				)
			);
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await model.findById(decoded.id);

			next();
		} catch (err) {
			console.log(err);

			return next(new ErrorResponse("Invalid Token", 500));
		}
	});

// Grant Access to specific role
exports.authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorResponse(
					`User role ${req.user.role} is not authorized to access this route`,
					403
				)
			);
		}
		next();
	};
};

// exports.ownership = (data) => {
// 	 //   Ownership or admin
// 	 if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
// 		return next(new ErrorResponse(`Not authorize to update the review`, 401));
// 	  }
// }
