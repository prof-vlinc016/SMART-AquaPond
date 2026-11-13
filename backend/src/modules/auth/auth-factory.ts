import { createMySqlPool } from "../../infrastructure/database/mysql/mysql.js";
import { SecureTokenGenerator } from "../../infrastructure/security/generator/SecureTokenGenerator.js";
import { BcryptPasswordHasher } from "../../infrastructure/security/hashing/BcryptPasswordhasher.js";
import { Sha256RefreshTokenHasher } from "../../infrastructure/security/hashing/Sha256RefreshTokenHasher.js";
import { JwtService } from "../../infrastructure/security/jwt/JwtService.js";
import { AuthController } from "./controller/AuthController.js";
import { MySqlAuthUserRepository } from "./repositories/MySqlAuthUserRepository.js";
import { MySqlRefreshTokenRepository } from "./repositories/MysqlRefreshTokenRepository.js";
import { AuthRouter } from "./routes/AuthRouter.js";
import { RefreshTokenService } from "./services/RefreshTokenService.js";
import { AuthenticateUserUsecase } from "./usecases/AuthenticateUserUsecase.js";
import { CreateUserUsecase } from "./usecases/CreateUserUsecase.js";
import { RefreshSessionUsecase } from "./usecases/RefreshSessionUsecase.js";
import { RevokeSessionUsecase } from "./usecases/RevokeSessionUsecase.js";

const pool = createMySqlPool();

const authUserRepository = new MySqlAuthUserRepository(pool);

const refreshTokenRepository = new MySqlRefreshTokenRepository(pool);

const passwordHasher = new BcryptPasswordHasher();

const refreshTokenHasher = new Sha256RefreshTokenHasher();

const randomTokenGenerator = new SecureTokenGenerator();

const refreshSessionManager = new RefreshTokenService(
	refreshTokenRepository,
	refreshTokenHasher,
	randomTokenGenerator,
);

const tokenIssuer = new JwtService();

const createUserUsecase = new CreateUserUsecase(
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

const revokeSessionUsecase = new RevokeSessionUsecase(refreshSessionManager);

const authUserController = new AuthController(
	createUserUsecase,
	authenticateUserUsecase,
	refreshSessionUsecase,
	revokeSessionUsecase,
);

const authRouter = new AuthRouter(authUserController);

export default authRouter.getRouter();
