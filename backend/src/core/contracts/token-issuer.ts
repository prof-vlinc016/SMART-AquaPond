import { TokenPayload } from "../types/token-payload.js";

export interface TokenIssuer {
    issue(payload: TokenPayload): string;
}