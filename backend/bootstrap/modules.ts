import { Pool } from "mysql2/promise";
import { DatabaseConnection } from "../src/core/database/contracts/database-connection.js";
import { TokenIssuer } from "../src/core/contracts/token-issuer.js";
import { TokenVerifier } from "../src/core/contracts/token-verifier.js";
import { Server as SocketIOServer } from "socket.io";
import { PresenceManager } from "../src/core/contracts/presence-manager.js";
import { SocketIoUserNotifier } from "../src/infrastructure/websocket/notifier/SocketIoUserNotifier.js";
import { AuthModule } from "../src/modules/auth/AuthModule.js";
import { UserModule } from "../src/modules/user/UserModule.js";

interface ModulesDependencies {
	database: DatabaseConnection<Pool>;
	tokenVerifier: TokenVerifier;
	tokenIssuer: TokenIssuer;
	presenceManager: PresenceManager;
	io: SocketIOServer;
}

export function createModules(dependencies: ModulesDependencies) {
	const userNotifer = new SocketIoUserNotifier(
		dependencies.io,
		dependencies.presenceManager,
	);

	const authModule = new AuthModule(
		dependencies.database,
		dependencies.tokenVerifier,
		dependencies.tokenIssuer,
	);

	const userModule = new UserModule(dependencies.database, userNotifer);

    return {
        authModule,
        userModule
    }
}
