import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../../errors/ForbiddenError.js";

export function createRoleMiddleware(...allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!allowedRoles.includes(req.user?.role)) {
            throw new ForbiddenError();
        }

        next();
    }
}