import express from "express";

const app = express();

app.get("/api/health", (req, res) => {
  res.status(200).json({
        success: true,
        status: "healthy",
        message: "API is running"
    });
});

export default app;