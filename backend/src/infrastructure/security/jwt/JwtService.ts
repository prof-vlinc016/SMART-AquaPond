import { TokenIssuer } from "../../../core/contracts/token-issuer.js";
import { TokenVerifier } from "../../../core/contracts/token-verifier.js";
import { TokenPayload } from "../../../core/types/token-payload.js";
import { AppError } from "../../../core/errors/AppError.js";
import jwt from "jsonwebtoken";
import { UnAuthorizedError } from "../../../core/errors/UnAuthorizedError.js";
import { StringValue } from "ms";

export interface JwtConfig {
	secret?: string;
	expiresIn?: string;
}

export class JwtService implements TokenIssuer, TokenVerifier {
	private readonly secret: jwt.Secret;
	private readonly expiresIn: jwt.SignOptions["expiresIn"];

	constructor(config: JwtConfig) {
		if (!config.secret || !config.expiresIn) {
			throw new AppError("JWT config not defined!");
		}

		this.secret = config.secret;
		this.expiresIn = config.expiresIn as StringValue;
	}

	issue(payload: TokenPayload): string {
		const secret = this.secret;
		const options = {
			expiresIn: this.expiresIn,
		};

		return jwt.sign(payload, secret, options);
	}

	verify(token: string): TokenPayload {
		try {
			return jwt.verify(token, this.secret) as TokenPayload; 
		} catch (error: unknown) {
			throw new UnAuthorizedError("Invalid or missing token!");
		}
	}
}
