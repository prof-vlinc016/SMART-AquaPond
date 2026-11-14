import type { Socket } from "socket.io";
import { TokenVerifier } from "../../../core/contracts/token-verifier.js";
import { UnAuthorizedError } from "../../../core/errors/UnAuthorizedError.js";

export function createSocketAuthMiddleware(
    tokenVerifier: TokenVerifier
) {
    return (socket: Socket, next: (err?: Error) => void) => {
        try {
            const token = socket.handshake.auth?.token;

            if (typeof token !== "string" || !token) {
                return next(new UnAuthorizedError());
            }

            const payload = tokenVerifier.verify(token);

            socket.data.user = payload;

            next();
        } catch {
            next(new UnAuthorizedError());
        }
    };
}