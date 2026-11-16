import { Router } from "express";
import { AuthController } from "../controller/AuthController.js";
import { validateRequest } from "../../../core/http/middleware/validate-request.js";
import { authenticateUserSchema } from "../schema/authenticate-user.schema.js";
import { requireAuth } from "../../../core/http/middleware/jwt-auth.middleware.js";
import { TokenVerifier } from "../../../core/contracts/token-verifier.js";

export class AuthRouter {
	private router = Router();

	constructor(
		private readonly authController: AuthController,
		private readonly tokenVerifier: TokenVerifier,
	) {
		this.initializeRouter();
	}

	private initializeRouter() {
		const ac = this.authController;

		this.router.post(
			"/login",
			validateRequest.body(authenticateUserSchema),
			ac.loginUser.bind(ac),
		);

		this.router.post("/refresh", ac.refreshUserSession.bind(ac));

		this.router.post("/logout", ac.revokeUserSession.bind(ac));

		this.router.get(
			"/me",
			requireAuth(this.tokenVerifier),
			ac.getCurrentUser.bind(ac),
		);
	}

	public getRouter() {
		return this.router;
	}
}
