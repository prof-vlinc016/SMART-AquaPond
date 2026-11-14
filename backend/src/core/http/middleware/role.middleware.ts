import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../../errors/ForbiddenError.js";
import { TokenPayload } from "../../types/token-payload.js";

export function createRoleMiddleware(...allowedRoles: TokenPayload["role"][]) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!allowedRoles.includes(req.user?.role)) {
				throw new ForbiddenError();
			}

			next();
		} catch (error: unknown) {
			next(error);
		}
	};
}
