import { createPool, Pool } from "mysql2/promise";
import { env } from "../../../core/config/env.js";
import { DatabaseConnection } from "../../../core/database/contracts/database-connection.js";


export class MySqlDatabase implements DatabaseConnection<Pool> {
    private readonly pool: Pool;

    constructor() {
        this.pool = createPool({
            host: env.database.host,
            user: env.database.user,
            password: env.database.pass,
            database: env.database.name,
            waitForConnections: true,
            connectionLimit: 10
        });
    }

    getPool(): Pool {
        return this.pool;
    }
}