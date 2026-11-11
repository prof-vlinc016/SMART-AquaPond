import { Router } from "express";
import { AuthController } from "../controller/AuthController.js";
import { validateRequest } from "../../../core/http/middleware/validate-request.js";
import { createUserSchema } from "../schema/create-user.schema.js";
import { authenticateUserSchema } from "../schema/authenticate-user.schema.js";

export class AuthRouter {
	private router = Router();

	constructor(private authController: AuthController) {
		this.initializeRouter();
	}

	private initializeRouter() {
		const ac = this.authController;

		this.router.post(
			"/register",
			validateRequest.body(createUserSchema),
			ac.registerUser.bind(ac),
		);

		this.router.post(
			"/login",
			validateRequest.body(authenticateUserSchema),
			ac.loginUser.bind(ac),
		);

		this.router.post(
			"/refresh",
			ac.refreshUserSession.bind(ac),
		);

		this.router.post(
			"/logout",
			ac.revokeUserSession.bind(ac),
		);
	}

	public getRouter() {
		return this.router;
	}
}
