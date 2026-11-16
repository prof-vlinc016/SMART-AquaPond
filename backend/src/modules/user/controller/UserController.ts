import { Request, Response } from "express";
import { GetUserListUsecase } from "../usecases/GetUserListUsecase.js";
import { GetUserUsecase } from "../usecases/GetUserUsecase.js";
import { UpdateUserProfileUsecase } from "../usecases/UpdateUserProfileUsecase.js";
import { UserParams } from "../schema/user-params.shema.js";
import { response } from "../../../core/http/response.js";
import { UpdateUser } from "../schema/update-user.schema.js";
import { TokenPayload } from "../../../core/types/token-payload.js";
import { ImageFile } from "../../../core/types/image-file.js";
import { CreateUser } from "../schema/create-user.schema.js";
import { CreateUserUsecase } from "../usecases/CreateUserUsecase.js";
import { UserQuery } from "../schema/get-user.schema.js";

export class UserController {
	constructor(
		private readonly getUserListUsecase: GetUserListUsecase,
		private readonly getUserUsecase: GetUserUsecase,
		private readonly createUserUsecase: CreateUserUsecase,
		private readonly updateUserProfileUsecase: UpdateUserProfileUsecase,
	) {}

	async getUserList(req: Request, res: Response) {
		const userQuery = req.validatedQuery as UserQuery;
		
		const users = await this.getUserListUsecase.execute(userQuery);

		return response.success(res, "Users fetched successful!", users);
	}

	async getUserById(req: Request, res: Response) {
		const { id } = req.validatedParams as UserParams;

		const user = await this.getUserUsecase.execute(id);

		return response.success(res, "User fetched successful!", user);
	}

	async createUser(req: Request, res: Response) {
		const createUserInput = req.validatedBody as CreateUser;

		const imageFile = req.file as ImageFile | undefined;

		await this.createUserUsecase.execute({
			...createUserInput,
			profileImage: imageFile ?? null,
		});

		return response.created(res, "User created successful!");
	}

	async updateUserProfile(req: Request, res: Response) {
		const { id } = req.user as TokenPayload;

		const updateUserInput = req.validatedBody as UpdateUser;

		const imageFile = req.file as ImageFile | undefined;

		const user = await this.updateUserProfileUsecase.execute({
			id,
			...updateUserInput,
			profileImage: imageFile ?? null,
		});

		return response.success(res, "User updated successful!");
	}
}
