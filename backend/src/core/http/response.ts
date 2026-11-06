import type { Response } from "express";

export const response = {
	success<T>(res: Response, data: T, message = "Request successful") {
		return res.status(200).json({
			success: true,
			message,
			data,
		});
	},

	created<T>(
		res: Response,
		data: T,
		message = "Resource created successfully",
	) {
		return res.status(201).json({
			success: true,
			message,
			data,
		});
	},

	error(
		res: Response,
		message = "Request failed",
		details: string[] | null,
		statusCode = 400,
		code = "REQUEST_ERROR",
	) {
		return res.status(statusCode).json({
			success: false,
			message,
			details,
			code,
		});
	},

	noContent(res: Response) {
		return res.status(204).send();
	},
};
