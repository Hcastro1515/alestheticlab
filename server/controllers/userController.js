import { validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import user from '../models/user.js'
import bcrypt from 'bcrypt';

const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ status: '404', errors: errors.array() });
  }

  const { username, pin } = req.body;

  try {
    //Hash password
    const hash = bcrypt.hashSync(pin, 10);

    const userExists = await user.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    user.create({
      username,
      hash
    });

    res.status(200).json({ success: "User registration is successful" });

  } catch (err) {
    next(err)
  }
});

export {
  registerUser
}
