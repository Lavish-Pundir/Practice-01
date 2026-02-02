import userService from "../services/userService.js";  


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const savedUser = await userService.registerUser({ name, email, password });

        return res.status(201).json(savedUser);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const loginUser = async (req, res) => { 
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser({ email, password });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserProfile(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;    
        const updatedUser = await userService.updateUserProfile(userId, updateData);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const deleteUserProfile = async ( req, res ) => {
    try {
        const userId = req.params.id;
        const user  = await userService.deleteUserProfile(userId);
        if (!user) {
             return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


export default {
    registerUser,
    loginUser,
    getUserProfile,
    getAllUsers,
    updateUserProfile,
    deleteUserProfile,
};