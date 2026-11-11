import { UniqueConstraintError } from "../../../core/database/errors/UniqueConstraintError.js";
import { IAuthUserRepository } from "../contracts/auth-user-repository.js";
import { PasswordHasher } from "../contracts/password-hasher.js";
import { createUserInput } from "../dtos/create-user.dto.js";
import { AuthUser } from "../entities/AuthUser.js";
import { EmailAlreadyExistError } from "../errors/EmailAlreadyExistError.js";
import { UsernameAlreadyExistError } from "../errors/UsernameAlreadyExistError.js";

export class CreateUserUsecase {
	constructor(
		private readonly authUserRepository: IAuthUserRepository,
		private readonly passwordHasher: PasswordHasher,
	) {}

	async execute(userInput: createUserInput) {
		try {
			const passwordHash = await this.passwordHasher.hash(
				userInput.password,
			);

			const authUser = AuthUser.create(
				userInput.firstname,
				userInput.lastname,
				userInput.username,
				userInput.email,
				passwordHash,
			);

			return await this.authUserRepository.create(authUser);
		} catch (error: unknown) {
			if (error instanceof UniqueConstraintError) {
				switch (error.constraint) {
					case "uq_users_email":
						throw new EmailAlreadyExistError();
					case "uq_users_username":
						throw new UsernameAlreadyExistError();
				}
			}

			throw error;
		}
	}
}
