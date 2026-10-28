
export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500,
    public readonly code: string = "INTERNAL_ERROR"
  ) {
    super(message);

    this.name = new.target.name;

    // Maintains the prototype chain for Error subclasses.
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
