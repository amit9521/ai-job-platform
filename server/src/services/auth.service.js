import bcrypt from "bcrypt";
import { AppError } from "../utils/AppError.js";
import User from "../models/User.js";

export const registerUserService = async (userData) => {
    const { name, email, password } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email
    };
};