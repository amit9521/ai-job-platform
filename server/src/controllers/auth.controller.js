import { registerUserService } from "../services/auth.service.js";

export const registerUser = async (req, res) => {
    const result = await registerUserService(req.body);

    res.status(201).json({
        success: true,
        message: "Registration successful",
        data: result
    });
};