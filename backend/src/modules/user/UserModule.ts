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

export class UserModule<TConnection extends Pool> {
	private readonly router: Router;

	constructor(
		database: DatabaseConnection<TConnection>,
		userNotifier: UserNotifier,
	) {
		const userRepository = new MysqlUserRepository(database.getPool());

		const getUserListUsecase = new GetUserListUsecase(
			userRepository,
			userNotifier,
		);

		const getUserUsecase = new GetUserUsecase(userRepository);

		const updateUserProfileUsecase = new UpdateUserProfileUsecase(
			userRepository,
		);

		const userController = new UserController(
			getUserListUsecase,
			getUserUsecase,
			updateUserProfileUsecase,
		);

		const userRouter = new UserRouter(userController);
		this.router = userRouter.getRouter();
	}

	getRouter(): Router {
		return this.router;
	}
}
