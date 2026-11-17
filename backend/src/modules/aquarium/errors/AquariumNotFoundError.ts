import { NotFoundError } from "../../../core/errors/NotFoundError.js";

export class AquariumNotFoundError extends NotFoundError {
	constructor() {
		super("Aquarium not found!");
		this.name = new.target.name;
	}
}
