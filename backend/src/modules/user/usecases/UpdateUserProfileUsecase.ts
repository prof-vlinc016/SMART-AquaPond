import { ImageStorage } from "../../../core/contracts/image-storage.js";
import { UniqueConstraintError } from "../../../core/database/errors/UniqueConstraintError.js";
import { UserRepository } from "../contracts/user-repository.js";
import { UpdateUserProflieInput } from "../dtos/update-user-profile.dto.js";
import { UsernameAlreadyExistError } from "../errors/UsernameAlreadyExistError.js";
import { UserNotFoundError } from "../errors/UserNotFoundError.js";

export class UpdateUserProfileUsecase {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly imageStorage: ImageStorage,
	) {}

	async execute(userProfileInput: UpdateUserProflieInput) {
		try {
			const user = await this.userRepository.findById(
				userProfileInput.id,
			);

			if (!user) {
				throw new UserNotFoundError();
			}

			if (userProfileInput.profileImage) {
				if (user.profileImage) {
					await this.imageStorage.delete(user.profileImage);
				}

				const profilePath = await this.imageStorage.upload(
					userProfileInput.profileImage,
					"/user-profiles",
				);

				user.updateProfile({ profileImage: profilePath });
			}

			user.updateProfile({
				firstname: userProfileInput.firstname,
				lastname: userProfileInput.lastname,
				username: userProfileInput.username,
			});

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
