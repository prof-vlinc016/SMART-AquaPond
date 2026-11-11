import { UnAuthorizedError } from "../../../core/errors/UnAuthorizedError.js";

export class InvalidSessionError extends UnAuthorizedError {
	constructor(message: string = "Invalid Session!") {
		super(message);
		this.name = new.target.name;
	}
}
