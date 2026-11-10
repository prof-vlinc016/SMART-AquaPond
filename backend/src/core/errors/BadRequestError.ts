import { AppError } from "./AppError.js";

export class BadRequestError extends AppError {
	constructor(
		message: string = "Bad request!",
		code: string = "BAD_REQUEST_ERROR",
	) {
		super(message, 400, code);

		this.name = new.target.name;
	}
}
