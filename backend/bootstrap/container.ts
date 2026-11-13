// bootstrap/container.ts

import { MySqlDatabase } from "../src/infrastructure/database/mysql/MySqlDarabase.js";
import { JwtService } from "../src/infrastructure/security/jwt/JwtService.js";
import { AuthModule } from "../src/modules/auth/AuthModule.js";
import { UserModule } from "../src/modules/user/UserModule.js";

const database = new MySqlDatabase();

const jwtService = new JwtService();

const authModule = new AuthModule(database, jwtService, jwtService);

const userModule = new UserModule(database);

export const container = {
	pool: database.getPool(),
	auth: authModule,
    user: userModule,
    tokenVerifier: jwtService
};
