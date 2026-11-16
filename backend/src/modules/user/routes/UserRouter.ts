import { Router } from "express";
import { UserController } from "../controller/UserController.js";
import { validateRequest } from "../../../core/http/middleware/validate-request.js";
import { updateUserProfileSchema } from "../schema/update-user.schema.js";
import { userParamsSchema } from "../schema/user-params.shema.js";
import { TokenVerifier } from "../../../core/contracts/token-verifier.js";
import { requireAuth } from "../../../core/http/middleware/jwt-auth.middleware.js";
import { requireRole } from "../../../core/http/middleware/role.middleware.js";
import { upload } from "../../../core/http/middleware/upload.middleware.js";
import { createUserSchema } from "../schema/create-user.schema.js";
import { userQuerySchema } from "../schema/get-user.schema.js";

export class UserRouter {
	private router = Router();

	constructor(
		private readonly userController: UserController,
		private readonly tokenVerifier: TokenVerifier,
	) {
		this.initializeRouter();
	}

	private initializeRouter() {
		const uc = this.userController;

		this.router.get(
			"/",
			requireAuth(this.tokenVerifier),
			requireRole("ADMIN"),
			validateRequest.query(userQuerySchema),
			uc.getUserList.bind(uc),
		);

		this.router.get(
			"/:id",
			requireAuth(this.tokenVerifier),
			requireRole("ADMIN"),
			validateRequest.params(userParamsSchema),
			uc.getUserById.bind(uc),
		);

		this.router.post(
			"/",
			requireAuth(this.tokenVerifier),
			requireRole("ADMIN"),
			upload.single("profileImage"),
			validateRequest.body(createUserSchema),
			uc.createUser.bind(uc),
		);

		this.router.post(
			"/profiles",
			requireAuth(this.tokenVerifier),
			requireRole("ADMIN", "OPERATOR"),
			upload.single("profileImage"),
			validateRequest.body(updateUserProfileSchema),
			uc.updateUserProfile.bind(uc),
		);
	}

	public getRouter() {
		return this.router;
	}
}
