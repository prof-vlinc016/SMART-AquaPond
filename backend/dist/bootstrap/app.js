import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler } from "../src/core/http/middleware/error-handler.js";
import { env } from "../src/core/config/env.js";
const app = express();
app.use(helmet());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || env.clientOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
// Health check
app.get("/api/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "AquaPond API is running",
    });
});
// Unknown routes
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
// Centralized error handling must be last
app.use(errorHandler);
export default app;
