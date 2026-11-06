import { AppError } from "./AppError.js";

export class ForbiddenError extends AppError {
	constructor(message: string = "Forbidden: Insufficient permission!") {
		super(message, 403, "FORBIDDEN_ERROR");

		this.name = new.target.name;
	}
}
