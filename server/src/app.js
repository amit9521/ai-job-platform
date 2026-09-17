import express from "express";

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

app.get("/api/users/:id", (req, res) => {
    res.status(200).json({
        success: true,
        userId: req.params.id,
        query: req.query
    });
});

app.post("/api/users", (req, res) => {
    res.status(201).json({
        success: true,
        message: "User received",
        data: req.body
    });
});

export default app;