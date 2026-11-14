export interface PresenceManager {
	connect(userId: string, socketId: string): boolean;
	disconnect(userId: string, socketId: string): boolean;
	isOnline(userId: string): boolean;
	getOnlineUserIds(): string[];
}
