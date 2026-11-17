import { UserRepository } from "../contracts/user-repository.js";
import { UserNotifier } from "../contracts/user-notitfier.js";
import { UserQueryInput } from "../dtos/get-user-query.dto.js";

export class GetUserListUsecase {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly userNotifier: UserNotifier, // Unused for now
	) {}

	async execute(userQueryInput: UserQueryInput) {
		const userList = await this.userRepository.findAll(userQueryInput);
		const totalUser = await this.userRepository.getTotalUsers();
		const totalPages = Math.ceil(totalUser / userQueryInput.limit);

		return {
			items: userList,
			totalItems: totalUser,
			totalPages: totalPages,
			hasMore: userQueryInput.page < totalPages,
		};
	}
}
