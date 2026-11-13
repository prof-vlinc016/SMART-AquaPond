import { NextFunction, Request, Response } from "express";
import { TokenVerifier } from "../../contracts/token-verifier.js";
import { UnAuthorizedError } from "../../errors/UnAuthorizedError.js";

export function createAuthMiddleware(tokenVerifier: TokenVerifier) {
	return (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader?.includes("Bearer ")) {
                throw new UnAuthorizedError("Invalid or missing token!");
            }

            const token = authHeader.substring(7);
            const payload = tokenVerifier.verify(token);

            req.user = payload;

            next();
        } catch (error: unknown) {
            next(error);
        }
    };
}
