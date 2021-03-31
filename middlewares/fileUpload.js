const multer = require("multer");
const ErrorResponse = require("../utils/ErrorResponse");
const path = require("path");
exports.uploadMultiple = (field, count, dest) => {
	// Multer setup for file uploading
	const galleryStorage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, dest);
		},
		filename: function (req, file, cb) {
			let ext = "";
			if (file.originalname.split(".").length > 1) {
				ext = file.originalname.substring(
					file.originalname.lastIndexOf(".")
				);
			}
			const fileName = req.params.id + "-" + Date.now() + ext;
			cb(null, fileName);
		},
	});

	const galleryUpload = multer({
		storage: galleryStorage,
		onError: function (err, next) {
			console.log("error", err);
			return next(new ErrorResponse("Error uploading image", 500));
		},
		fileFilter: (req, file, cb) => {
			if (
				file.mimetype == "image/png" ||
				file.mimetype == "image/jpg" ||
				file.mimetype == "image/jpeg"
			) {
				cb(null, true);
			} else {
				cb(null, false);
				return cb(
					next(
						new ErrorResponse(
							"Only .png, .jpg and .jpeg format allowed!",
							400
						)
					)
				);
			}
		},
	});

	return galleryUpload.array(field, count);
};

// Upload single file
exports.uploadSingle = (field, dest) => {
	// Multer setup for file uploading
	const imageStorage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, dest);
		},
		filename: function (req, file, cb) {
			let ext = "";
			if (file.originalname.split(".").length > 1) {
				ext = file.originalname.substring(
					file.originalname.lastIndexOf(".")
				);
			}
			// const fileName =
			// 	file.originalname.split(".")[0] + "-" + Date.now() + ext;
			const fileName = file.originalname.split(".")[0] + ext;
			req.body.fileName = fileName;
			cb(null, fileName);
		},
	});

	const imageUpload = multer({
		storage: imageStorage,
		onError: function (err, next) {
			return next(new ErrorResponse("Error uploading image", 500));
		},
		fileFilter: (req, file, cb) => {
			if (
				file.mimetype == "image/png" ||
				file.mimetype == "image/jpg" ||
				file.mimetype == "image/jpeg"
			) {
				cb(null, true);
			} else {
				cb(null, false);
				return cb(
					next(
						new ErrorResponse(
							"Only .png, .jpg and .jpeg format allowed!",
							400
						)
					)
				);
			}
		},
	});

	return imageUpload.single(field);
};
