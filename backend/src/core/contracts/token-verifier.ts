// core/contracts/token-verifier.ts

import type { TokenPayload } from "../types/token-payload.js";

export interface TokenVerifier {
    verify(token: string): Promise<TokenPayload>;
}