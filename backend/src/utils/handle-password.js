const bcrypt = require("bcryptjs");
const { ApiError } = require("./api-error");

const generateHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // You can change the salt rounds
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const verifyPassword = async (passwordFromDb, passwordFromUser) => {
    const isPasswordValid = await bcrypt.compare(passwordFromUser, passwordFromDb);
    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid credential");
    }
};

module.exports = {
    generateHashedPassword,
    verifyPassword
};
