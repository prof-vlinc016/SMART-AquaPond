import { TransactionContext } from "../../../core/database/contracts/transaction-context.js";
import { UniqueConstraintError } from "../../../core/database/errors/UniqueConstraintError.js";
import { IAuthUserRepository } from "../contracts/auth-user-repository.js";
import { PasswordHasher } from "../contracts/password-hasher.js";
import { RegisterUserInput } from "../dtos/register-user.dto.js";
import { AuthUser } from "../entities/AuthUser.js";
import { EmailAlreadyExistError } from "../errors/EmailAlreadyExistError.js";
import { UsernameAlreadyExistError } from "../errors/UsernameAlreadyExistError.js";

export class RegisterIdentityUsecase {
	constructor(
		private readonly authUserRepository: IAuthUserRepository,
		private readonly passwordHasher: PasswordHasher,
	) {}

	async execute(
		userInput: RegisterUserInput,
		transactionContext: TransactionContext,
	) {
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

			return await this.authUserRepository.create(
				authUser,
				transactionContext,
			);
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
