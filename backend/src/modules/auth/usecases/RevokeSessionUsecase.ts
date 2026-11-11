import { RefreshSessionManager } from "../contracts/refresh-session-manager.js";
import { InvalidSessionError } from "../errors/InvalidSessionError.js";

export class RevokeSessionUsecase {
	constructor(
		private readonly refreshSessionManager: RefreshSessionManager,
	) {}

	async execute(token: string) {
		if (!token) {
			throw new InvalidSessionError("Invalid or missing session token!");
		}

		try {
			const refreshToken =
				await this.refreshSessionManager.validate(token);

			refreshToken.markLogout(new Date());

			await this.refreshSessionManager.revoke(refreshToken);
		} catch (error: unknown) {
			//  do nothing, session already ended
			console.error(error);
		}
	}
}
