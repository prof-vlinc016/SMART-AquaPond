import { createServer } from "node:http";
import { Express } from "express";

interface ServerConfig {
	name: string;
	port: number;
}

export class Server {
	readonly httpServer;
	private app?: Express;
	
	constructor(private readonly config: ServerConfig) {
		this.httpServer = createServer((req, res) => {
			if (!this.app) {
				res.statusCode = 503;
				res.end("Application not ready");
				return;
			}

			this.app(req, res);
		});
	}

	attachApp(app: Express) {
		this.app = app;
	}

	start() {
		this.httpServer.listen(this.config.port, () => {
			console.log(
				`${this.config.name} running on port ${this.config.port}`,
			);
		});
	}
}
