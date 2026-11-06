import { ErrorRequestHandler } from "express";
import { AppError } from "../../errors/AppError.js";
import { response } from "../response.js";
import { ValidationError } from "../../errors/ValidationError.js";

export const errorHandler: ErrorRequestHandler = (err, req, res, cb) => {
	if (err instanceof ValidationError) {
		return response.error(
			res,
			err.message,
			err.statusCode,
			err.code,
			err.details
		);
	}

	if (err instanceof AppError) {
		return response.error(
			res,
			err.message,
			err.statusCode,
			err.code,
		);
	}

	console.error(err);

	return response.error(res, "Internal server error!", 500);
};
