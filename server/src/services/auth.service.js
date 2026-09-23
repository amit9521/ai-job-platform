export const registerUserService = (userData) => {
    return {
        name: userData.name,
        email: userData.email,
        message: "User registration service executed"
    };
};