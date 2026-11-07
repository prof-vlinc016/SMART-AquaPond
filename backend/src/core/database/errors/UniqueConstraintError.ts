import { AppError } from "../../errors/AppError.js";

export class UniqueConstraintError extends AppError {
	constructor(public readonly constraint: string | null) {
		super(`A unique constraint violated!`);

		this.name = new.target.name;
	}
}
