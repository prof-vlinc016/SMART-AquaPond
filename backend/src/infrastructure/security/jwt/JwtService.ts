import { TokenIssuer } from "../../../core/contracts/token-issuer.js";
import { TokenVerifier } from "../../../core/contracts/token-verifier.js";
import { TokenPayload } from "../../../core/types/token-payload.js";
import { env } from "../../../core/config/env.js";
import { AppError } from "../../../core/errors/AppError.js";
import jwt from "jsonwebtoken";
import { UnAuthorizedError } from "../../../core/errors/UnAuthorizedError.js";

export class JwtService implements TokenIssuer, TokenVerifier {
	issue(payload: TokenPayload): string {
		const secret = env.jwt.secret as jwt.Secret;
		const options = {
			expiresIn: env.jwt.expiresIn as jwt.SignOptions["expiresIn"],
		};

		if (!secret) {
			throw new AppError("JWT_SECRET not defined!");
		}

		return jwt.sign(payload, secret, options);
	}

	verify(token: string): TokenPayload {
		const secret = env.jwt.secret as jwt.Secret;

		if (!secret) {
			throw new AppError("JWT_SECRET not defined!");
		}

		try {
			return jwt.verify(token, secret) as TokenPayload;
		} catch (error: unknown) {
			throw new UnAuthorizedError("Invalid or missing token!");
		}
	}
}
