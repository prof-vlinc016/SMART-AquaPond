import { ImageStorage } from "../../../core/contracts/image-storage.js";
import { TransactionManager } from "../../../core/database/contracts/transaction-manager.js";
import { AppError } from "../../../core/errors/AppError.js";
import { RegisterIdentityUsecase } from "../../auth/usecases/RegisterIdentityUsecase.js";
import { UserRepository } from "../contracts/user-repository.js";
import { CreateUserInput } from "../dtos/create-user.dto.js";

export class CreateUserUsecase {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly transactionManager: TransactionManager,
		private readonly registerIdentity: RegisterIdentityUsecase,
		private readonly imageStorage: ImageStorage,
	) {}

	async execute(userInput: CreateUserInput) {
		return this.transactionManager.execute(async (context) => {
			const userId = await this.registerIdentity.execute(
				userInput,
				context,
			);

			if (userInput.profileImage) {
				const profilePath = await this.imageStorage.upload(
					userInput.profileImage,
					"/user-profiles",
				);

				await this.userRepository.insertProfileImage(
					userId,
					profilePath,
				);
			}
		});
	}
}
