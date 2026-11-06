import { AppError } from "./AppError.js";

export class ForbiddenError extends AppError {
    constructor() {
        super("Forbidden: Insufficient permission!", 403, "FORBIDDEN_ERROR");

        this.name = new.target.name;
    }
}