import { TokenIssuer } from "../../../core/contracts/token-issuer.js";
import { IAuthUserRepository } from "../contracts/auth-user-repository.js";
import { RefreshSessionManager } from "../contracts/refresh-session-manager.js";
import { InvalidSessionError } from "../errors/InvalidSessionError.js";

export class RefreshSessionUsecase {
	constructor(
		private readonly iAuthUserRepository: IAuthUserRepository,
		private readonly refreshSessionManager: RefreshSessionManager,
		private readonly tokenIssuer: TokenIssuer,
	) {}

	async execute(token: string) {

		if (!token) {
			throw new InvalidSessionError("Invalid or missing session token!");
		}

		const refreshToken = await this.refreshSessionManager.rotate(token);
		const authUser = await this.iAuthUserRepository.findById(
			refreshToken.userId,
		);

		if (!authUser) {
			throw new InvalidSessionError();
		}

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
