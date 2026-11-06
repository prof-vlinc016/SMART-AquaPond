import { AppError } from "./AppError.js";

export class ValidationError extends AppError {
	constructor(
		message: string = "Validation failed!",
		public readonly details: string[],
	) {
		super(message, 400, "VALIDATION_ERROR");
        
		this.name = new.target.name;
        this.details = details;
	}
}
