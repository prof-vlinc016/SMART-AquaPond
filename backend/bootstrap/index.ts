import { env } from "../src/core/config/env.js";
import { createSocketServer } from "../src/infrastructure/websocket/socket-server.js";
import { createApp } from "./app.js";
import { createContainer } from "./container.js";
import { createModules } from "./modules.js";
import { Server } from "./Server.js";

const server = new Server({
	name: env.app.name,
	port: env.app.port,
});

const container = createContainer({
	persistenceConfig: {
		host: env.database.host,
		user: env.database.user,
		password: env.database.pass,
		database: env.database.name,
		port: env.database.port,
	},
	jwtConfig: { secret: env.jwt.secret, expiresIn: env.jwt.expiresIn },
});

const socketServer = createSocketServer({
	httpServer: server.httpServer,
	presenceManager: container.presenceManager,
	socketConfig: {
		clientOrigins: env.clientOrigins,
	},
	tokenVerifier: container.jwtService,
});

const modules = createModules({
	database: container.database,
	tokenIssuer: container.jwtService,
	tokenVerifier: container.jwtService,
	presenceManager: container.presenceManager,
	io: socketServer,
});

const app = createApp({
	clientOrigins: env.clientOrigins,
	authRouter: modules.authModule.getRouter(),
	userRouter: modules.userModule.getRouter(),
});

server.attachApp(app);

server.start();
