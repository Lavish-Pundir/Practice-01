import userModel from '../models/user.model.js';

const createUserByEmail = async (userData) => {
    try {
        const newUser = new userModel(userData);
        await newUser.save();
        return newUser;
    } catch (err) {
        throw new Error(`Error in createUserByEmail: ${err.message}`);
    }
};

const findUserByEmail = async (email) => {
    try {   
        const user = await userModel.findOne({ email });
        return user;
    } catch (err) {
        throw new Error(`Error in findUserByEmail: ${err.message}`);
    }
};

const findUserById = async (id) => {
    try {
        const user = await userModel.findById(id);
        return user;
    }catch (err) {
        throw new Error(`Error in findUserById: ${err.message}`);
    }
};

const findAllUsers = async () => {
    try {
        const users = await userModel.find({});
        return users;
    } catch (err) {
        throw new Error(`Error in findAllUsers: ${err.message}`);
    }
};

const updateUserById = async (id, updateData) => {
    try {
        const updatedData = await userModel.findByIdAndUpdate(id, updateData, { new: true });
        return updatedData;
    } catch (err) {
        throw new Error(`Error in updateUserById: ${err.message}`);
    }
};

const deleteUserById = async (id) => {
    try {
        const deletedData = await userModel.deleteOne({_id: id });
        return deletedData;
    } catch (err) {
        throw new Error(`Error in deleteUserById: ${err.message}`);
    }
}

export default {
    createUserByEmail,
    findUserByEmail,
    findUserById,
    findAllUsers,
    updateUserById,
    deleteUserById,
};