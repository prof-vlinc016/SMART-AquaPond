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
	},

	params(schema: ZodType) {
		return (req: Request, res: Response, next: NextFunction) => {
			const result = schema.safeParse(req.params);

			this.evaluate(result);

			req.params = result.data as Record<string, any>;

			next();
		};
	},

	body(schema: ZodType) {
		return (req: Request, res: Response, next: NextFunction) => {
			const result = schema.safeParse(req.body);

			this.evaluate(result);

			req.body = result.data;

			next();
		};
	},

	query(schema: ZodType) {
		return (req: Request, res: Response, next: NextFunction) => {
			const result = schema.safeParse(req.query);

			this.evaluate(result);

			req.query = result.data as Record<string, any>;

			next();
		};
	},
};
