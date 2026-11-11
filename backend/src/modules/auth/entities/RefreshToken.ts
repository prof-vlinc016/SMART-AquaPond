import { TokenAlreadyUsedError } from "../errors/TokenAlreadyUsedError.js";
import { TokenExpiredError } from "../errors/TokenExpiredError.js";

export default class RefreshToken {
	private constructor(
		public readonly id: number,
		public readonly tokenHash: string,
		public readonly userId: number,
		public expiresAt: Date | string | null,
		public revokeReason: string | null,
		public revokedAt: Date | string | null,
		public plainToken: string,
	) {}

	static create(tokenHash: string, userId: number, expiresAt: Date) {
		return new RefreshToken(
			0,
			tokenHash,
			userId,
			expiresAt,
			null,
			null,
			"",
		);
	}

	static reconstitute(data: {
		id: number;
		tokenHash: string;
		userId: number;
		expiresAt: Date | string | null;
		revokeReason: string | null;
		revokedAt: Date | string | null;
	}) {
		return new RefreshToken(
			data.id,
			data.tokenHash,
			data.userId,
			data.expiresAt ? new Date(data.expiresAt) : null,
			data.revokeReason,
			data.revokedAt ? new Date(data.revokedAt) : null,
			"",
		);
	}

	isExpired(now: Date) {
		return (
			this.expiresAt !== null &&
			this.expiresAt instanceof Date &&
			this.expiresAt > now
		);
	}

	isRevoked() {
		return this.revokedAt !== null;
	}

	assertUsable(now: Date) {
		if (this.isRevoked()) {
			throw new TokenAlreadyUsedError();
		}

		if (this.isExpired(now)) {
			throw new TokenExpiredError();
		}
	}

	markRotate(now: Date) {
		this.revokeReason = "ROTATION";
		this.revokedAt = now;
	}

	markReused(now: Date) {
		this.revokeReason = "REUSE_DETECTED";
		this.revokedAt = now;
	}

	markExpired(now: Date) {
		this.revokeReason = "EXPIRED";
		this.revokedAt = now;
	}

	markAdmin(now: Date) {
		this.revokeReason = "ADMIN";
		this.revokedAt = now;
	}

	markLogout(now: Date) {
		this.revokeReason = "LOGOUT";
		this.revokedAt = now;
	}

	setToken(token: string) {
		this.plainToken = token;
	}
}
