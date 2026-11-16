import { Pool } from "mysql2/promise";
import { DatabaseConnection } from "../src/core/database/contracts/database-connection.js";
import { TokenIssuer } from "../src/core/contracts/token-issuer.js";
import { TokenVerifier } from "../src/core/contracts/token-verifier.js";
import { Server as SocketIOServer } from "socket.io";
import { PresenceManager } from "../src/core/contracts/presence-manager.js";
import { SocketIoUserNotifier } from "../src/infrastructure/websocket/notifier/SocketIoUserNotifier.js";
import { AuthModule } from "../src/modules/auth/AuthModule.js";
import { UserModule } from "../src/modules/user/UserModule.js";
import { TransactionManager } from "../src/core/database/contracts/transaction-manager.js";
import { ImageStorage } from "../src/core/contracts/image-storage.js";

interface ModulesDependencies {
	database: DatabaseConnection<Pool>;
	transactionManager: TransactionManager;
	tokenVerifier: TokenVerifier;
	tokenIssuer: TokenIssuer;
	presenceManager: PresenceManager;
	io: SocketIOServer;
	imageStorage: ImageStorage
}

export function createModules(dependencies: ModulesDependencies) {
	const userNotifer = new SocketIoUserNotifier(
		dependencies.io,
		dependencies.presenceManager,
	);

	const authModule = new AuthModule(
		dependencies.database,
		dependencies.tokenIssuer,
		dependencies.tokenVerifier
	);

	const userModule = new UserModule(
		dependencies.database,
		dependencies.transactionManager,
		authModule.getRegisterIdentityUsecase(),
		dependencies.imageStorage,
		dependencies.tokenVerifier,
		userNotifer,
	);

	return {
		authModule,
		userModule,
	};
}
