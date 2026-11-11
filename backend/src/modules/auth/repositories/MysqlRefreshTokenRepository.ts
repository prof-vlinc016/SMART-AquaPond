import { Pool } from "mysql2/promise";
import { RefreshTokenRepository } from "../contracts/refresh-token-repository.js";
import RefreshToken from "../entities/RefreshToken.js";

export class MySqlRefreshTokenRepository implements RefreshTokenRepository {
	constructor(private readonly db: Pool) {}

	async findByHash(tokenHash: string): Promise<RefreshToken | null> {
		const [rows] = await this.db.execute(
			`SELECT 
                id,
                user_id AS userId,
                token_hash AS tokenHash,
                expires_at AS expiresAt,
                revoked_at AS revokedAt,
                revoke_reason AS revokeReason
            FROM refresh_tokens 
            WHERE token_hash = ?`,
			[tokenHash],
		);

		const refreshTokens = rows as RefreshToken[];

		return refreshTokens[0]
			? RefreshToken.reconstitute(refreshTokens[0])
			: null;
	}

	async findUserActiveToken(userId: number): Promise<RefreshToken | null> {
		const [rows] = await this.db.execute(
			`SELECT 
                id,
                user_id AS userId,
                token_hash AS tokenHash,
                expires_at AS expiresAt,
                revoked_at AS revokedAt,
                revoke_reason AS revokeReason
            FROM refresh_tokens 
            WHERE user_id = ?
            AND revoked_at IS NULL`,
			[userId],
		);

		const refreshTokens = rows as RefreshToken[];

		return refreshTokens[0]
			? RefreshToken.reconstitute(refreshTokens[0])
			: null;
	}

	async create(refreshToken: RefreshToken): Promise<void> {
		await this.db.execute(
			`INSERT INTO refresh_tokens (
                token_hash, 
                user_id, 
                expires_at
            ) VALUES (?, ?, ?)`,
			[
				refreshToken.tokenHash,
				refreshToken.userId,
				refreshToken.expiresAt,
			],
		);
	}

	async revoke(refreshToken: RefreshToken): Promise<void> {
		await this.db.execute(
			`UPDATE refresh_tokens
                SET revoked_at = CURRENT_TIMESTAMP(),
                revoke_reason = ?
            WHERE user_id = ?
            AND token_hash = ?`,
			[
				refreshToken.revokeReason,
				refreshToken.userId,
				refreshToken.tokenHash,
			],
		);
	}

	async revokeAllActive(refreshToken: RefreshToken): Promise<void> {
		await this.db.execute(
			`UPDATE refresh_tokens
                SET revoked_at = CURRENT_TIMESTAMP(),
                revoke_reason = ?
            WHERE user_id = ?
            AND (revoked_at IS NULL OR token_hash = ?)`,
			[
				refreshToken.revokeReason,
				refreshToken.userId,
				refreshToken.tokenHash,
			],
		);
	}
}
