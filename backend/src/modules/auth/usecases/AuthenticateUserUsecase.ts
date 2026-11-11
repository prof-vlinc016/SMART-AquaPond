import { TokenIssuer } from "../../../core/contracts/token-issuer.js";
import { IAuthUserRepository } from "../contracts/auth-user-repository.js";
import { PasswordHasher } from "../contracts/password-hasher.js";
import { RefreshSessionManager } from "../contracts/refresh-session-manager.js";
import { AuthResult } from "../dtos/auth-result.js";
import { AuthenticateUserInput } from "../dtos/authenticate-user-dto.js";
import { InvalidCredentialError } from "../errors/InvalidCredentialError.js";

export class AuthenticateUserUsecase {
	constructor(
		private readonly iAuthUserRepository: IAuthUserRepository,
		private readonly passwordHasher: PasswordHasher,
		private readonly refreshSessionManager: RefreshSessionManager,
		private readonly tokenIssuer: TokenIssuer,
	) {}

	async execute(
		authenticateUserInput: AuthenticateUserInput,
	): Promise<AuthResult> {
		const authUser = await this.iAuthUserRepository.findByEmail(
			authenticateUserInput.email,
		);

		if (!authUser) {
			throw new InvalidCredentialError();
		}

		if (
			!(await this.passwordHasher.verify(
				authenticateUserInput.password,
				authUser.password,
			))
		) {
			throw new InvalidCredentialError();
		}

		const refreshToken = await this.refreshSessionManager.create(
			authUser.id,
		);

		const accessToken = this.tokenIssuer.issue({
			id: authUser.id,
			role: authUser.role,
		});

		return {
			user: {
				id: authUser.id,
				role: authUser.role,
			},

			refreshToken: refreshToken.plainToken,
			accessToken: accessToken,
		};
	}
}
