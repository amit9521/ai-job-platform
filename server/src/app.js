import express from "express";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "healthy",
        message: "API is running"
    });
});

app.use("/api/auth", authRouter);

// Centralized error handler
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

export default app;