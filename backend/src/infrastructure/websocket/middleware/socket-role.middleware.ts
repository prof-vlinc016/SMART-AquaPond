import type { Socket } from "socket.io";
import { TokenPayload } from "../../../core/types/token-payload.js";

export function requireSocketRole(
	socket: Socket,
	...allowedRoles: TokenPayload["role"][]
): void {
	const user = socket.data.user;

	if (!allowedRoles.includes(user.role)) {
		throw new Error("Forbidden");
	}
}
