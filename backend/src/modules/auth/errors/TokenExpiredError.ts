import { UnAuthorizedError } from "../../../core/errors/UnAuthorizedError.js";

export class TokenExpiredError extends UnAuthorizedError {
	constructor(message: string = "Token Already Expired!") {
		super(message);

		this.name = new.target.name;
	}
}
