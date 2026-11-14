import type { TokenPayload } from "./token-payload.js";

declare module "socket.io" {
    interface SocketData {
        user: TokenPayload;
    }
}

export {};