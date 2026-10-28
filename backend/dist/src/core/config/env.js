import "dotenv/config";
export const env = {
    nodeEnv: process.env.NODE_ENV ?? "development",
    clientOrigins: (process.env.CLIENT_ORIGINS ?? "http://localhost:5173")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
    app: {
        name: process.env.APP_NAME ?? "AquaPond API",
        url: process.env.APP_URL ?? "http://localhost:3000",
        port: Number(process.env.APP_PORT ?? 3000),
    },
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        name: process.env.DB_NAME,
        port: Number(process.env.DB_PORT ?? 3306),
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },
};
