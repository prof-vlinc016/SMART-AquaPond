import { NotFoundError } from "../../../core/errors/NotFoundError.js";

export class UserNotFoundError extends NotFoundError {
	constructor() {
		super("User not found!");

		this.name = new.target.name;
	}
}
