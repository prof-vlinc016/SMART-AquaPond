import { Router } from "express";
import { SecureTokenGenerator } from "../../infrastructure/security/generator/SecureTokenGenerator.js";
import { BcryptPasswordHasher } from "../../infrastructure/security/hashing/BcryptPasswordhasher.js";
import { Sha256RefreshTokenHasher } from "../../infrastructure/security/hashing/Sha256RefreshTokenHasher.js";
import { AuthController } from "./controller/AuthController.js";
import { MySqlAuthUserRepository } from "./repositories/MySqlAuthUserRepository.js";
import { MySqlRefreshTokenRepository } from "./repositories/MysqlRefreshTokenRepository.js";
import { AuthRouter } from "./routes/AuthRouter.js";
import { RefreshTokenService } from "./services/RefreshTokenService.js";
import { AuthenticateUserUsecase } from "./usecases/AuthenticateUserUsecase.js";
import { RefreshSessionUsecase } from "./usecases/RefreshSessionUsecase.js";
import { RevokeSessionUsecase } from "./usecases/RevokeSessionUsecase.js";
import { Pool } from "mysql2/promise";
import { DatabaseConnection } from "../../core/database/contracts/database-connection.js";
import { TokenIssuer } from "../../core/contracts/token-issuer.js";
import { RegisterIdentityUsecase } from "./usecases/RegisterIdentityUsecase.js";
import { TokenVerifier } from "../../core/contracts/token-verifier.js";

export class AuthModule<TConnection extends Pool> {
	private readonly router: Router;
	private readonly registerIdentityUsecase: RegisterIdentityUsecase;

	constructor(
		database: DatabaseConnection<TConnection>,
		tokenIssuer: TokenIssuer,
		tokenVerifier: TokenVerifier,
	) {
		const authUserRepository = new MySqlAuthUserRepository(
			database.getPool(),
		);

		const refreshTokenRepository = new MySqlRefreshTokenRepository(
			database.getPool(),
		);

		const passwordHasher = new BcryptPasswordHasher();

		const refreshTokenHasher = new Sha256RefreshTokenHasher();

		const randomTokenGenerator = new SecureTokenGenerator();

		const refreshSessionManager = new RefreshTokenService(
			refreshTokenRepository,
			refreshTokenHasher,
			randomTokenGenerator,
		);

		this.registerIdentityUsecase = new RegisterIdentityUsecase(
			authUserRepository,
			passwordHasher,
		);

		const authenticateUserUsecase = new AuthenticateUserUsecase(
			authUserRepository,
			passwordHasher,
			refreshSessionManager,
			tokenIssuer,
		);

		const refreshSessionUsecase = new RefreshSessionUsecase(
			authUserRepository,
			refreshSessionManager,
			tokenIssuer,
		);

		const revokeSessionUsecase = new RevokeSessionUsecase(
			refreshSessionManager,
		);

		const authUserController = new AuthController(
			authenticateUserUsecase,
			refreshSessionUsecase,
			revokeSessionUsecase,
		);

		const authRouter = new AuthRouter(authUserController, tokenVerifier);

		this.router = authRouter.getRouter();
	}

	getRouter(): Router {
		return this.router;
	}

	getRegisterIdentityUsecase(): RegisterIdentityUsecase {
		return this.registerIdentityUsecase;
	}
}
