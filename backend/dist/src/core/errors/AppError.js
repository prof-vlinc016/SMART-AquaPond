export class AppError extends Error {
    statusCode;
    code;
    constructor(message, statusCode = 500, code = "INTERNAL_ERROR") {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.name = new.target.name;
        // Maintains the prototype chain for Error subclasses.
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
