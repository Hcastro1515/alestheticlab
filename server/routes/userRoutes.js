import express from "express";
import { body } from "express-validator";
import {registerUser} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', [
  body('username').notEmpty().withMessage('username is Required'),
  body('pin').notEmpty().withMessage('Pin is required'),
],
  registerUser
)


export default userRouter;
