import { Request, Response } from "express";
import { GetUserListUsecase } from "../usecases/GetUserListUsecase.js";
import { GetUserUsecase } from "../usecases/GetUserUsecase.js";
import { UpdateUserProfileUsecase } from "../usecases/UpdateUserProfileUsecase.js";
import { UserParams } from "../schema/user-params.shema.js";
import { response } from "../../../core/http/response.js";
import { UpdateUser } from "../schema/update-user.schema.js";

export class UserController {
	constructor(
		private readonly getUserListUsecase: GetUserListUsecase,
		private readonly getUserUsecase: GetUserUsecase,
		private readonly updateUserProfileUsecase: UpdateUserProfileUsecase,
	) {}

	async getUserList(req: Request, res: Response) {
		const users = await this.getUserListUsecase.execute();

		return response.success(res, "Users fetched successful!", users);
	}

	async getUserById(req: Request, res: Response) {
		const { id } = req.params as unknown as UserParams;

		const user = await this.getUserUsecase.execute(id);

		return response.success(res, "User fetched successful!", user);
	}

	async updateUserProfile(req: Request, res: Response) {
		const { id } = req.params as unknown as UserParams;
		const updateUserInput = req.body as UpdateUser;

		const user = await this.updateUserProfileUsecase.execute({
			id,
			...updateUserInput,
		});

		return response.success(res, "User updated successful!", user);
	}
}
