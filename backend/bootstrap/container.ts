import {
	MySqlDatabase,
	MySqlDatabaseConfig,
} from "../src/infrastructure/database/mysql/MySqlDatabase.js";
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

	const jwtService = new JwtService(dependencies.jwtConfig);

	const presenceManager = new SocketPresenceManager();

	return {
		database,
		jwtService,
		presenceManager,
	};
}
