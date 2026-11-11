import { NotFoundError } from "../../../core/errors/NotFoundError.js";

export class TokenNotFoundError extends NotFoundError {
	constructor(message: string = "Token not found!") {
		super(message);

		this.name = new.target.name;
	}
}
