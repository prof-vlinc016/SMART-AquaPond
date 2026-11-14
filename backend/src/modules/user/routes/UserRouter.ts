import { Router } from "express";
import { UserController } from "../controller/UserController.js";
import { validateRequest } from "../../../core/http/middleware/validate-request.js";
import { updateUserProfileSchema } from "../schema/update-user.schema.js";
import { userParamsSchema } from "../schema/user-params.shema.js";

export class UserRouter {
	private router = Router();

	constructor(private readonly userController: UserController) {
		this.initializeRouter();
	}

	private initializeRouter() {
		const uc = this.userController;

		this.router.get("/", uc.getUserList.bind(uc));

		this.router.get(
			"/:id",
			validateRequest.params(userParamsSchema),
			uc.getUserById.bind(uc),
		);

		this.router.post(
			"/:id",
			validateRequest.params(userParamsSchema),
			validateRequest.body(updateUserProfileSchema),
			uc.updateUserProfile.bind(uc),
		);
	}

	public getRouter() {
		return this.router;
	}
}
