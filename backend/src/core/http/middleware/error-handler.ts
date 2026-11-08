import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError.js";
import { response } from "../response.js";
import { ValidationError } from "../../errors/ValidationError.js";
import { IsBodyParserError } from "../../errors/BodyParserError.js";

export const errorHandler: ErrorRequestHandler = (
	err: unknown,
	req: Request,
	res: Response,
	cb: NextFunction,
) => {
	console.error(err);

	if (err instanceof ValidationError) {
		return response.error(
			res,
			err.message,
			err.statusCode,
			err.code,
			err.details,
		);
	}

	if (err instanceof AppError) {
		return response.error(res, err.message, err.statusCode, err.code);
	}

	if (IsBodyParserError(err) && err.type === "entity.parse.failed") {
		return response.error(
			res,
			"Malformed JSON request body.",
			err.statusCode,
		);
	}

	return response.error(res, "Internal server error!", 500);
};
