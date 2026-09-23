const simulateDatabaseOperation = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: "user-001",
                created: true
            });
        }, 1000);
    });
};

export const registerUserService = async (userData) => {
    const savedUser = await simulateDatabaseOperation();

    return {
        id: savedUser.id,
        name: userData.name,
        email: userData.email
    };
};