import {
	MySqlDatabase,
	MySqlDatabaseConfig,
} from "../src/infrastructure/database/mysql/MySqlDatabase.js";
import { MySqlTransactionManager } from "../src/infrastructure/database/mysql/MySqlTransactionManager.js";
import { ImageService } from "../src/infrastructure/file/image/image.service.js";
import {
	JwtConfig,
	JwtService,
} from "../src/infrastructure/security/jwt/JwtService.js";
import { SocketPresenceManager } from "../src/infrastructure/websocket/presence/SocketPresenceManager.js";

interface ContainerDependency {
	persistenceConfig: MySqlDatabaseConfig;
	jwtConfig: JwtConfig;
}

export function createContainer(dependencies: ContainerDependency) {
	const database = new MySqlDatabase(dependencies.persistenceConfig);

	const transactionManager = new MySqlTransactionManager(database.getPool());

	const jwtService = new JwtService(dependencies.jwtConfig);

	const presenceManager = new SocketPresenceManager();

	const imageStorage = new ImageService();

	return {
		database,
		transactionManager,
		jwtService,
		presenceManager,
		imageStorage,
	};
}
