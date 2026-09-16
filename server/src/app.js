import express from "express";

const app = express();

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "API is running"
    });
});

export default app;