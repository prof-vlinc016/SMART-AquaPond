import RefreshToken from "../entities/RefreshToken.js";

export interface RefreshSessionManager {
	create(userId: number): Promise<RefreshToken>;
	validate(token: string): Promise<RefreshToken>;
	rotate(token: string): Promise<RefreshToken>;
	revoke(refreshToken: RefreshToken): Promise<void>;
}
