import { registerUserService } from "../services/auth.service.js";

export const registerUser = (req, res) => {
    const result = registerUserService(req.body);

    res.status(201).json({
        success: true,
        message: "Registration successful",
        data: result
    });
};