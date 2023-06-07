import { validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import users from '../models/users.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ status: '404', errors: errors.array() });
  }

  const { username, pin } = req.body;

  try {
    //Hash password
    const hashedPin = bcrypt.hashSync(pin, 10);

    const userExists = await users.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    await users.create({
      username,
      hashedPin
    });

    res.status(200).json({ success: "User registration is successful" });

  } catch (err) {
    next(err)
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ status: '404', errors: errors.array() });
  }

  const { username, pin } = req.body;

  try {
    //steps to authenticate user 
    //Get user from database
    const user = await users.findOne({ username });

    if (!user) {
      return next({ status: '404', message: 'user not found' })
    }

    //if user exist, get user pin and compare passwords
    const isPinMatch = await bcrypt.compare(pin, user.hashedPin);
    if (!isPinMatch) {
      return next({ status: '401', message: 'Invalid Pin' });
    }

    const token = jwt.sign({ id: user._id, }, process.env.JWT_SECRECT, {
      expiresIn: '1h'
    });

    res.json({ token });
  } catch (err) {
    next(err);
  }
});

export {
  registerUser,
  loginUser
}
