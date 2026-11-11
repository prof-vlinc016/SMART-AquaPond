import { UnAuthorizedError } from "../../../core/errors/UnAuthorizedError.js";

export class TokenAlreadyUsedError extends UnAuthorizedError {
	constructor() {
		super("Token Already used!");

		this.name = new.target.name;
	}
}
