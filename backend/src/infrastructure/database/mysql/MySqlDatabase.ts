import { createPool, Pool } from "mysql2/promise";
import { DatabaseConnection } from "../../../core/database/contracts/database-connection.js";
import { AppError } from "../../../core/errors/AppError.js";

export interface MySqlDatabaseConfig {
	host?: string;
	user?: string;
	password?: string;
	database?: string;
	port: number;
}

export class MySqlDatabase implements DatabaseConnection<Pool> {
	private readonly pool: Pool;

	constructor(config: MySqlDatabaseConfig) { 
		if (
			!config.host ||
			!config.user ||
			!config.password ||
			!config.database
		) {
			throw new AppError("MySql database config not defined!");
		}

		this.pool = createPool({
			host: config.host,
			user: config.user,
			password: config.password,
			database: config.database,
			port: config.port,
			waitForConnections: true,
			connectionLimit: 10,
		});
	}

	getPool(): Pool {
		return this.pool;
	}
}
