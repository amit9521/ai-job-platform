import bcrypt from "bcrypt";
import { AppError } from "../utils/AppError.js";
import User from "../models/User.js";

export const registerUserService = async (userData) => {
  try {
    const { name, email, password } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError("Email already exists", 409);
    }

    throw error;
  }
};

export const loginUserService = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};
