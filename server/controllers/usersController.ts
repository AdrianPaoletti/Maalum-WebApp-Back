import dotenv from "dotenv";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../database/models/user";
import ErrorCode from "../../interfaces/error/error";

dotenv.config();

const loginUser = async (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  const secret: any = process.env.SECRET;
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      const error = new ErrorCode("Incorrect username");
      error.code = 401;
      next(error);
    } else {
      const rightPassword = await bcrypt.compare(password, user.password);
      if (!rightPassword) {
        const error = new ErrorCode("Incorrect password");
        error.code = 401;
        next(error);
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
            password: user.password,
          },
          secret
        );
        res.json({ token });
      }
    }
  } catch (error) {
    next(error);
  }
};

const registerUser = async (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  try {
    const user = req.body;
    const { username } = req.body;
    const userCheck = await User.findOne({ username });
    if (userCheck !== null) {
      const error = new ErrorCode("Username already exists, please change it");
      error.code = 404;
      next(error);
    } else {
      const userHashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await User.create({
        ...user,
        password: userHashedPassword,
      });
      if (newUser) {
        res.json(newUser);
      } else {
        const error = new ErrorCode("Not possible to create a new user");
        error.code = 404;
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
};

export { loginUser, registerUser };
