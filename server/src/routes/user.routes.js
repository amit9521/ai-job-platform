import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Get users"
    });
});

router.get("/:id", (req, res) => {
    res.status(200).json({
        success: true,
        userId: req.params.id,
        query: req.query
    });
});

export default router;