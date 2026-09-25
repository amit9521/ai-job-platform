import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

import { validateRegister } from "../middlewares/validateRegister.js";
import { validateLogin } from "../middlewares/validateLogin.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);

router.post("/login", validateLogin, loginUser);

export default router;
