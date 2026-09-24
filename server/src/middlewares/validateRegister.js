

import { AppError } from "../utils/AppError.js";
import { registerSchema } from "../validators/auth.validator.js";

export const validateRegister = (req, res, next) => {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
        const message = result.error.issues
            .map((issue) => issue.message)
            .join(", ");

        return next(new AppError(message, 400));
    }

    req.body = result.data;

    next();
};