import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });
    const isPasswordCorrect = await bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid password." });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ userInfo: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  const name = `${lastName} ${firstName}`;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(404).json({ msessage: "user already exists." });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password does not match." });
    const hash = bcrypt.hashSync(password, 8);
    const name = `${lastName} ${firstName}`;

    const result = await User.create({ email, password: hash, name });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ userInfo: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
