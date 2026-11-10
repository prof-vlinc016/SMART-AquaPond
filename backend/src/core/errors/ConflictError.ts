import { AppError } from "./AppError.js";

export class ConflictError extends AppError {
	constructor(message: string = "Conflict!") {
		super(message, 409, "CONFLICT_ERROR");

		this.name = new.target.name;
	}
}
