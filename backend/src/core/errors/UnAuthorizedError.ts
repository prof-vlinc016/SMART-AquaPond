import { AppError } from "./AppError.js";

export class UnAuthorizedError extends AppError {
	constructor(message: string = "Unauthorized!") {
		super(message, 401, "UNAUTHORIZED_ERROR");

		this.name = new.target.name;
	}
}
