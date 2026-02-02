import express from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import { signupSchema, loginSchema } from "../validations/user.validation.js";

const router = express.Router();

router.post('/register', validate(signupSchema), userController.registerUser);
router.post('/login', validate(loginSchema), userController.loginUser);

router.get('/profile/:id', authMiddleware, userController.getUserProfile);

router.get('/', userController.getAllUsers);

router.put('/update/:id', userController.updateUserProfile);

router.delete('/delete/:id', userController.deleteUserProfile);

export default router; 