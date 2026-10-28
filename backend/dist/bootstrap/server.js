import { env } from "../src/core/config/env.js";
import app from "./app.js";
async function startServer() {
    try {
        const appName = env.app.name;
        const appPort = env.app.port;
        app.listen(appPort, () => {
            console.log(`${appName} running on port ${appPort}`);
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            process.exit(1);
        }
    }
}
startServer();
