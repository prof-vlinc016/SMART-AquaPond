import { UnAuthorizedError } from "../../../core/errors/UnAuthorizedError.js";

export class InvalidCredentialError extends UnAuthorizedError {
	constructor() {
		super("Invalid user credentials!");

		this.name = new.target.name;
	}
}
