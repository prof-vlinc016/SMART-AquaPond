import { Pool } from "mysql2/promise";
import { AuthModule } from "../src/modules/auth/AuthModule.js";
import { UserModule } from "../src/modules/user/UserModule.js";
import { Router } from "express";

interface AppRouterDependencies {
	authModule: AuthModule<Pool>;
	userModule: UserModule<Pool>;
}

export function createAppRouter(dependencies: AppRouterDependencies) {
	const router = Router();

	router.use("/auth", dependencies.authModule.getRouter());
	router.use("/users", dependencies.userModule.getRouter());

	return router;
}
