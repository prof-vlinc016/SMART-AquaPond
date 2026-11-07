import { AppError } from "../../errors/AppError.js";
import { UniqueConstraintError } from "../errors/UniqueConstraintError.js";
import { extractConstraintName } from "./mysql-constraint-extractor.js";
import { IsMysqlError } from "./mysql-error.js";

export function translateMySqlError(error: unknown): Error {
    if (IsMysqlError(error)) {
        switch (error.code) {
            case "ER_DUP_ENTRY":
                const constraint = extractConstraintName(error);
                return new UniqueConstraintError(constraint);        
            default:
                return error;
        }
    }

    return error instanceof Error ? error : new AppError("Persistence Error");
}


