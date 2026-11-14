import { UserRepository } from "../contracts/user-repository.js";
import { UserNotFoundError } from "../errors/UserNotFoundError.js";

export class GetUserUsecase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(userId: number) {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new UserNotFoundError();
		}

		return user;
	}
}
