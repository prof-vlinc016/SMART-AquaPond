import { UniqueConstraintError } from "../../../core/database/errors/UniqueConstraintError.js";
import { UserRepository } from "../contracts/user-repository.js";
import { UpdateUserProflieInput } from "../dtos/update-user-profile.dto.js";
import { UsernameAlreadyExistError } from "../errors/UsernameAlreadyExistError.js";
import { UserNotFoundError } from "../errors/UserNotFoundError.js";

export class UpdateUserProfileUsecase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(userProfileInput: UpdateUserProflieInput) {
		try {
			const user = await this.userRepository.findById(
				userProfileInput.id,
			);

			if (!user) {
				throw new UserNotFoundError();
			}

			user.updateProfile(userProfileInput);

			return await this.userRepository.update(user);
		} catch (error: unknown) {
			if (
				error instanceof UniqueConstraintError &&
				error.constraint === "uq_users_username"
			) {
				throw new UsernameAlreadyExistError();
			}

			throw error;
		}
	}
}
