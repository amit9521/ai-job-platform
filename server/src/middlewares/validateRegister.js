
import { AppError } from "../utils/AppError.js";

export const validateRegister = (req, res, next) => {
    const { name, email } = req.body;

    if (!name) {
        return next(new AppError("Name is required", 400));
    }

    if (typeof name !== "string") {
        return next(new AppError("Name must be a string", 400));
    }

    if (!email) {
        return next(new AppError("Email is required", 400));
    }

    if (typeof email !== "string") {
        return next(new AppError("Email must be a string", 400));
    }

    next();
};