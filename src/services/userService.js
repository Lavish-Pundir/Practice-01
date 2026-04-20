// src/services/userService.js          
import userRepository from "../repositort/user.repository.js";
import { hashPassword, veryfyPassword, isPasswordStrong, isValidGmail } from "../utils/password.utils.js";
import { generateToken } from "../utils/token.utils.js";

const registerUser = async ({ name, email, password }) => {
    if (!name || !email || !password) {
        throw new Error("All fields are required");
    }

    if (!isPasswordStrong(password)) {
        throw new Error("Password is not strong enough");
    }

    if (!isValidGmail(email)) {
        throw new Error("Invalid Gmail address");
    }

    const hashedPassword = await hashPassword(password);

    const user = await userRepository.createUserByEmail({
        name,
        email,
        password: hashedPassword
    });
    const token = generateToken(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET
    );
    user.token = token;
    user.password = undefined;
    return { user, token };
    // return { ...user,  token, password: undefined };
};

const loginUser = async ({ email, password }) => {
    try {
        // console.log("SECRET:", process.env.JWT_SECRET);
        const user = await userRepository.findUserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = await veryfyPassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }
        user.password = undefined; // Remove password before returning user object
        const token = generateToken(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET
        );
        user.token = token;
        return { user, token };
    } catch (err) {
        throw new Error(`Error in loginUser: ${err.message}`);
    }
};

const getUserProfile = async (userId) => {
    try {
        const user = await userRepository.findUserById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        user.password = undefined;
        return user;
    } catch (err) {
        throw new Error(`Error in getUserProfile: ${err.message}`);
    }
};

const getAllUsers = async () => {
    try {
        const users = await userRepository.findAllUsers();
        users.forEach(user => user.password = undefined); // Remove passwords before returning user objects
        return users;
    } catch (err) {
        throw new Error(`Error in getAllUsers: ${err.message}`);
    }
};

const updateUserProfile = async (userId, updateData) => {
    try {
        if (updateData.password) {
            if (!isPasswordStrong(updateData.password)) {
                throw new Error("Password is not strong enough");
            }
            updateData.password = await hashPassword(updateData.password);
        }
        const updatedUser = await userRepository.updateUserById(userId, updateData);
        if (!updatedUser) {
            throw new Error("User not found");
        }
        updatedUser.password = undefined;
        return updatedUser;
    } catch (err) {
        throw new Error(`Error in updateUserProfile: ${err.message}`);
    }
};

const deleteUserProfile = async (id) => {
    try {
        const deletedUser = await userRepository.deleteUserById(id);
        return deletedUser;
    } catch (err) {
        throw new Error(`Error in deleteUserById: ${err.message}`);
    }
}


export default {
    registerUser,
    loginUser,
    getAllUsers,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
}