import { Pool } from "mysql2/promise";
import { UserController } from "./controller/UserController.js";
import { MysqlUserRepository } from "./repository/MySqlUserRepository.js";
import { UserRouter } from "./routes/UserRouter.js";
import { GetUserListUsecase } from "./usecases/GetUserListUsecase.js";
import { GetUserUsecase } from "./usecases/GetUserUsecase.js";
import { UpdateUserProfileUsecase } from "./usecases/UpdateUserProfileUsecase.js";
import { Router } from "express";
import { DatabaseConnection } from "../../core/database/contracts/database-connection.js";
import { UserNotifier } from "./contracts/user-notitfier.js";
import { TokenVerifier } from "../../core/contracts/token-verifier.js";
import { ImageStorage } from "../../core/contracts/image-storage.js";
import { CreateUserUsecase } from "./usecases/CreateUserUsecase.js";
import { TransactionManager } from "../../core/database/contracts/transaction-manager.js";
import { RegisterIdentityUsecase } from "../auth/usecases/RegisterIdentityUsecase.js";

export class UserModule<TConnection extends Pool> {
	private readonly router: Router;

	constructor(
		database: DatabaseConnection<TConnection>,
		transactionManager: TransactionManager,
		registerIdentityUsecase: RegisterIdentityUsecase,
		imageStorage: ImageStorage,
		tokenVerifier: TokenVerifier,
		userNotifier: UserNotifier,
	) {
		const userRepository = new MysqlUserRepository(database.getPool());

		const getUserListUsecase = new GetUserListUsecase(
			userRepository,
			userNotifier,
		);

		const getUserUsecase = new GetUserUsecase(userRepository);

		const createUserUsecase = new CreateUserUsecase(
			userRepository,
			transactionManager,
			registerIdentityUsecase,
			imageStorage,
		);

		const updateUserProfileUsecase = new UpdateUserProfileUsecase(
			userRepository,
			imageStorage,
		);

		const userController = new UserController(
			getUserListUsecase,
			getUserUsecase,
			createUserUsecase,
			updateUserProfileUsecase,
		);

		const userRouter = new UserRouter(userController, tokenVerifier);
		this.router = userRouter.getRouter();
	}

	getRouter(): Router {
		return this.router;
	}
}
