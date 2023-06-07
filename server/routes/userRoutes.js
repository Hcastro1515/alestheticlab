import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', [
  body('username').notEmpty().withMessage('username is Required'),
  body('pin').notEmpty().withMessage('Pin is required'),
  body('confirmPin').notEmpty().withMessage('Pin is required'),

],
  registerUser
);

userRouter.post('/login', [
  body('username').notEmpty().withMessage('username is Required'),
  body('pin').notEmpty().withMessage('Pin is required')
],
  loginUser
);


export default userRouter;
