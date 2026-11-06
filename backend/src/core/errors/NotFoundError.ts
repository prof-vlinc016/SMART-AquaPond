import { AppError } from "./AppError.js";

export class NotFoundError extends AppError {
    constructor(message: string = "Not found!") {
        super(message, 404, "NOT_FOUND_ERROR");

        this.name = new.target.name;
    }
}