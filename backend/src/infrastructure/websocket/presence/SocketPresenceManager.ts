export class SocketPresenceManager {
    private readonly connections = new Map<string, Set<string>>();

    connect(userId: string, socketId: string): boolean {
        let sockets = this.connections.get(userId);

        const becameOnline = !sockets;

        if (!sockets) {
            sockets = new Set<string>();
            this.connections.set(userId, sockets);
        }

        sockets.add(socketId);

        return becameOnline;
    }

    disconnect(userId: string, socketId: string): boolean {
        const sockets = this.connections.get(userId);

        if (!sockets) return false;

        sockets.delete(socketId);

        if (sockets.size > 0) return false;

        this.connections.delete(userId);

        return true;
    }

    isOnline(userId: string): boolean {
        return this.connections.has(userId);
    }

    getOnlineUserIds(): string[] {
        return [...this.connections.keys()];
    }
}