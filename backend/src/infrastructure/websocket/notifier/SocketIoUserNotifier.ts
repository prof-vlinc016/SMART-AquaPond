import { Server } from "socket.io";
import { UserNotifier } from "../../../modules/user/contracts/user-notitfier.js";
import { PRESENCE_ROOM } from "../socket-server.js";
import { PresenceManager } from "../../../core/contracts/presence-manager.js";

export class SocketIoUserNotifier implements UserNotifier {
	constructor(
		private readonly io: Server,
		private readonly presenceManager: PresenceManager,
	) {}

	notifyOnlineUsers(): void {
		this.io.to(PRESENCE_ROOM).emit("presence:snapshot", {
			userIds: this.presenceManager.getOnlineUserIds(),
		});
	}
}
