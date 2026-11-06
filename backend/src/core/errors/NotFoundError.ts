import { AppError } from "./AppError.js";

export class NotFoundError extends AppError {
    constructor() {
        super("Not found!", 404, "NOT_FOUND_ERROR");

        this.name = new.target.name;
    }
}