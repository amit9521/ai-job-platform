import { AppError } from "../utils/AppError.js";

const simulateDatabaseOperation = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "user-001",
        created: true,
      });
    }, 1000);
  });
};
export const registerUserService = async (userData) => {
  if (userData.email === "error@test.com") {
    throw new AppError("Registration service failed", 400);
  }

  const savedUser = await simulateDatabaseOperation();

  return {
    id: savedUser.id,
    name: userData.name,
    email: userData.email,
  };
};
