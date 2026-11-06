export class AppError extends Error {
	constructor(
		message: string,
		public readonly details: string[] | null = null,
		public readonly statusCode: number = 500,
		public readonly code: string = "INTERNAL_ERROR",
	) {
		super(message);

		this.name = new.target.name;
		this.details = details;

		// Maintains the prototype chain for Error subclasses.
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
