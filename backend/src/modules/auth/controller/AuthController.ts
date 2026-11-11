import { Request, Response } from "express";
import { CreateUserUsecase } from "../usecases/CreateUserUsecase.js";
import { response } from "../../../core/http/response.js";
import { AuthenticateUserUsecase } from "../usecases/AuthenticateUserUsecase.js";
import ms, { StringValue } from "ms";
import { env } from "../../../core/config/env.js";
import { RefreshSessionUsecase } from "../usecases/RefreshSessionUsecase.js";
import { RevokeSessionUsecase } from "../usecases/RevokeSessionUsecase.js";

export class AuthController {
	constructor(
		private readonly createUserUsecase: CreateUserUsecase,
		private readonly authenticateUserUsecase: AuthenticateUserUsecase,
		private readonly refreshSessionUsecase: RefreshSessionUsecase,
		private readonly revokeSessionUsecase: RevokeSessionUsecase,
	) {}

	async registerUser(req: Request, res: Response) {
		const id = await this.createUserUsecase.execute(req.body);

		return response.created(res, "User created", id);
	}

	async loginUser(req: Request, res: Response) {
		const authResult = await this.authenticateUserUsecase.execute(req.body);

		this.attachRefreshCookie(res, authResult.refreshToken);

		return response.success(res, "Login successful!", {
			user: authResult.user,
			accessToken: authResult.accessToken,
		});
	}

	async refreshUserSession(req: Request, res: Response) {
		const authResult = await this.refreshSessionUsecase.execute(
			req.cookies.refresh_token,
		);

		this.attachRefreshCookie(res, authResult.refreshToken);

		return response.success(res, "Session refresh successful!", {
			user: authResult.user,
			accessToken: authResult.accessToken,
		});
	}

	async revokeUserSession(req: Request, res: Response) {
		await this.revokeSessionUsecase.execute(req.cookies.refresh_token);

		this.clearRefreshCookie(res);

		return response.success(res, "Logout successful!");
	}

	private attachRefreshCookie(res: Response, refreshToken: string) {
		const expiresIn = env.jwt.refreshExpiresIn as StringValue;

		res.cookie("refresh_token", refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge: ms(expiresIn),
		});
	}

	private clearRefreshCookie(res: Response) {
		const expiresIn = env.jwt.refreshExpiresIn as StringValue;

		res.clearCookie("refresh_token", {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge: ms(expiresIn),
		});
	}
}
