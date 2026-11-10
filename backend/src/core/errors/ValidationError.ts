import { AppError } from "./AppError.js";
import { BadRequestError } from "./BadRequestError.js";

export class ValidationError extends BadRequestError {
	constructor(
		message: string = "Validation failed!",
		public readonly details: string[],
	) {
		super(message, "VALIDATION_ERROR");

		this.name = new.target.name;
		this.details = details;
	}
}
