import RefreshToken from "../entities/RefreshToken.js";

export interface RefreshTokenRepository {
	findByHash(tokenHash: string): Promise<RefreshToken | null>;
	findUserActiveToken(userId: number): Promise<RefreshToken | null>;
	create(refreshToken: RefreshToken): Promise<void>;
	revoke(refreshToken: RefreshToken): Promise<void>;
	revokeAllActive(refreshToken: RefreshToken): Promise<void>;
}
