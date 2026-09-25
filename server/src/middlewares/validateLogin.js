import { AppError } from "../utils/AppError.js";
import { loginSchema } from "../validators/auth.validator.js";

export const validateLogin = (req, res, next) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        const message = result.error.issues
            .map((issue) => issue.message)
            .join(", ");

        return next(new AppError(message, 400));
    }

    req.body = result.data;

    next();
};