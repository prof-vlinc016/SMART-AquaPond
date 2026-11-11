import { RandomTokengenerator } from "../../../core/contracts/random-token-generator.js";
import { RefreshSessionManager } from "../contracts/refresh-session-manager.js";
import { RefreshTokenHasher } from "../contracts/refresh-token-hasher.js";
import { RefreshTokenRepository } from "../contracts/refresh-token-repository.js";
import RefreshToken from "../entities/RefreshToken.js";
import { TokenNotFoundError } from "../errors/TokenNotFoundError.js";

export class RefreshTokenService implements RefreshSessionManager {
	constructor(
		private readonly refreshTokenRepository: RefreshTokenRepository,
		private readonly refreshTokenHasher: RefreshTokenHasher,
		private readonly randomTokenGenerator: RandomTokengenerator,
	) {}

	async create(userId: number): Promise<RefreshToken> {
		const token = this.randomTokenGenerator.generate(64);
		const tokenHash = this.refreshTokenHasher.hash(token);
		const refreshToken = RefreshToken.create(tokenHash, userId, new Date());

		refreshToken.setToken(token);

		await this.refreshTokenRepository.create(refreshToken);

		return refreshToken;
	}

	async validate(token: string): Promise<RefreshToken> {
		const tokenHash = this.refreshTokenHasher.hash(token);
		const refreshToken =
			await this.refreshTokenRepository.findByHash(tokenHash);

		if (!refreshToken) {
			throw new TokenNotFoundError();
		}

		const now = new Date();

		if (refreshToken.isRevoked()) {
			refreshToken.markReused(now);
			await this.refreshTokenRepository.revokeAllActive(refreshToken);
		}

		if (!refreshToken.isRevoked() && refreshToken.isExpired(now)) {
			refreshToken.markExpired(now);
			await this.refreshTokenRepository.revoke(refreshToken);
		}

		refreshToken.assertUsable(now);

		return refreshToken;
	}

	async rotate(token: string): Promise<RefreshToken> {
		const refreshToken = await this.validate(token);

		refreshToken.markRotate(new Date());

		await this.refreshTokenRepository.revoke(refreshToken);

		return this.create(refreshToken.userId);
	}

	async revoke(refreshToken: RefreshToken): Promise<void> {
		await this.refreshTokenRepository.revoke(refreshToken);
	}
}
