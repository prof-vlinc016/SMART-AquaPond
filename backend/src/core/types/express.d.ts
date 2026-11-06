import type { TokenPayload } from "./token-payload";

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}

export {};