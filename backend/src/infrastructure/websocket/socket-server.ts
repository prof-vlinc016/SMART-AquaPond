import { Server as SocketServer } from "socket.io";
import type { Server as HttpServer } from "node:http";

import type { TokenVerifier } from "../../core/contracts/token-verifier.js";
import type { SocketPresenceManager } from "./presence/SocketPresenceManager.js";

import { createSocketAuthMiddleware } from "./middleware/socket-auth.middleware.js";
import { requireSocketRole } from "./middleware/socket-role.middleware.js";

interface SocketConfig {
	clientOrigins: string[];
}

interface SocketServerDependencies {
	httpServer: HttpServer;
	tokenVerifier: TokenVerifier;
	presenceManager: SocketPresenceManager;
	socketConfig: SocketConfig;
}

export const PRESENCE_ROOM = "presence:users";

export function createSocketServer(dependencies: SocketServerDependencies) {
	const io = new SocketServer(dependencies.httpServer, {
		cors: {
			origin: dependencies.socketConfig.clientOrigins,
			credentials: true,
		},
	});

	io.use(createSocketAuthMiddleware(dependencies.tokenVerifier));

	io.on("connection", (socket) => {
		const user = socket.data.user;

		const becameOnline = dependencies.presenceManager.connect(
			user.id,
			socket.id,
		);

		try {
			requireSocketRole(socket, "ADMIN");

			socket.join(PRESENCE_ROOM);

			socket.emit("presence:snapshot", {
				userIds: dependencies.presenceManager.getOnlineUserIds(),
			});
		} catch {}

		console.log({
			sub: user.id,
			role: user.role,
			rooms: [...socket.rooms],
			presenceRoomMembers:
				io.sockets.adapter.rooms.get(PRESENCE_ROOM)?.size ?? 0,
			becameOnline,
		});

		// Notify other authorized connections.
		if (becameOnline) {
			socket.to(PRESENCE_ROOM).emit("user:online", {
				userId: user.id,
			});
		}

		socket.on("disconnect", (reason) => {
			const becameOffline = dependencies.presenceManager.disconnect(
				user.id,
				socket.id,
			);

			if (becameOffline) {
				io.to(PRESENCE_ROOM).emit("user:offline", {
					userId: user.id,
				});
			}

			console.log(`User ${user.id} disconnected: ${reason}`);
		});
	});

	return io;
}
