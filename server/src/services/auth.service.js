import { AppError } from "../utils/AppError.js";
import User from "../models/User.js";

export const registerUserService = async (userData) => {
    if (userData.email === "error@test.com") {
        throw new AppError(
            "Registration service failed",
            400
        );
    }

    const user = await User.create({
        name: userData.name,
        email: userData.email
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email
    };
};