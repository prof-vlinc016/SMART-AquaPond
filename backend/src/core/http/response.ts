import type { Response } from "express";

export const response = {
	success<T>(res: Response, message: string, data?: T) {
		return res.status(200).json({
			success: true,
			message,
			data,
		});
	},

	created<T>(res: Response, message: string, data?: T) {
		return res.status(201).json({
			success: true,
			message,
			data,
		});
	},

	error(
		res: Response,
		message: string,
		statusCode: number = 400,
		code: string = "REQUEST_ERROR",
		details?: string[],
	) {
		return res.status(statusCode).json({
			success: false,
			message,
			code,
			details,
		});
	},

	noContent(res: Response) {
		return res.status(204).send();
	},
};
