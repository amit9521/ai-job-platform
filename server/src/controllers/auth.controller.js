import {registerUserService, loginUserService} from "../services/auth.service.js";

export const registerUser = async (req, res) => {
    
  const result = await registerUserService(req.body);

  res.status(201).json({
    success: true,
    message: "Registration successful",
    data: result,
  });
};

export const loginUser = async (req, res) => {
  const result = await loginUserService(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
};
