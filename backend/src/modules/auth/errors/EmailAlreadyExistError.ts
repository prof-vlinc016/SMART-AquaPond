import { ConflictError } from "../../../core/errors/ConflictError.js";

export class EmailAlreadyExistError extends ConflictError {
	constructor() {
		super("Conflict: Email already exist!");

		this.name = new.target.name;
	}
}
