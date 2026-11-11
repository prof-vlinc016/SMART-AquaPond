import { ConflictError } from "../../../core/errors/ConflictError.js";

export class UsernameAlreadyExistError extends ConflictError {
    constructor() {
        super("Conflict: Username already exist!");

        this.name = new.target.name;
    }
}
