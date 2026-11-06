import type { TokenPayload } from "../types/token-payload.js";

export interface TokenVerifier {
    verify(token: string): TokenPayload;
}