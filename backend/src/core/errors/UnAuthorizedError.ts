import { AppError } from "./AppError.js";

export class UnAuthorizedError extends AppError {
    constructor() {
        super("Unauthorized!", 401, "UNAUTHORIZED_ERROR");

        this.name = new.target.name;
    }
}