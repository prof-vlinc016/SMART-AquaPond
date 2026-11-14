import express, { Router, Express } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler } from "../src/core/http/middleware/error-handler.middleware.js";
import { AppError } from "../src/core/errors/AppError.js";
import { notFoundHandler } from "../src/core/http/middleware/not-found.middleware.js";

interface AppDependency {
	clientOrigins: string[];
	authRouter: Router;
	userRouter: Router;
}

export function createApp(dependencies: AppDependency) {
	const app = express();

	app.use(helmet());

	app.use(
		cors({
			origin: (origin, callback) => {
				if (!origin || dependencies.clientOrigins.includes(origin)) {
					return callback(null, true);
				}

				return callback(new AppError("Origin not allowed by CORS"));
			},
			credentials: true,
		}),
	);

	app.use(morgan("dev"));
	app.use(express.json({ limit: "5mb" }));
	app.use(cookieParser());

	// Health check
	app.get("/api/health", (_req, res) => {
		res.status(200).json({
			success: true,
			message: "AquaPond API is running",
		});
	});

	app.use("/api/auth", dependencies.authRouter);
	app.use("/api/user", dependencies.userRouter);

	app.use(notFoundHandler);
	app.use(errorHandler);

	return app;
}