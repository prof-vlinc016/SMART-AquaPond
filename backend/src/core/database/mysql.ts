import { createPool, Pool } from "mysql2/promise";
import { env } from "../config/env.js";

export function createMySqlPool(): Pool {
	return createPool({
		host: env.database.host,
		port: env.database.port,
		database: env.database.name,
		user: env.database.user,
		password: env.database.pass,

		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0,
	});
}
