import express from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.get('/profile/:id', authMiddleware, userController.getUserProfile);

router.get('/', userController.getAllUsers);

router.put('/update/:id', userController.updateUserProfile);

router.delete('/delete/:id', userController.deleteUserProfile);

export default router; 