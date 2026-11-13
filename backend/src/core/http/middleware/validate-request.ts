import { NextFunction, Request, Response } from "express";
import { ZodSafeParseResult, ZodType } from "zod";
import { ValidationError } from "../../errors/ValidationError.js";

export const validateRequest = {
	evaluate<T>(result: ZodSafeParseResult<T>) {
		if (!result.success) {
			const details = result.error.issues.map(
				(issue) => `${issue.path}: ${issue.message}`,
			);

			throw new ValidationError("Validation failed!", details);
		}

		return result.data;
	},

	params<T extends ZodType>(schema: T) {
		return (req: Request, res: Response, next: NextFunction) => {
			try {
				req.params = this.evaluate(
					schema.safeParse(req.params),
				) as Request["params"];

				next();
			} catch (error: unknown) {
				next(error);
			}
		};
	},

	body<T extends ZodType>(schema: T) {
		return (req: Request, res: Response, next: NextFunction) => {
			try {
				req.body = this.evaluate(schema.safeParse(req.body));

				next();
			} catch (error: unknown) {
				next(error);
			}
		};
	},

	query<T extends ZodType>(schema: T) {
		return (req: Request, res: Response, next: NextFunction) => {
			try {
				req.query = this.evaluate(
					schema.safeParse(req.query),
				) as Request["query"];

				next();
			} catch (error: unknown) {
				next(error);
			}
		};
	},
};
