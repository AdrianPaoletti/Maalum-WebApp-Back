import jwt from "jsonwebtoken";
import express from "express";

class ErrorCode extends Error {
  code: number | undefined;
}

export interface RequestAuth extends express.Request {
  userId?: string;
  file?: any;
}

const Auth = (req: RequestAuth, res: express.Response, next: any) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    const error = new ErrorCode("You are unauthorizated");
    error.code = 401;
    next(error);
  } else {
    const token = authHeader.split(" ")[1];
    if (!token) {
      const error = new ErrorCode("Could not find token");
      error.code = 401;
      next(error);
    } else {
      try {
        // const user = jwt.verify(token, process.env.SECRET);
        // req.userId =
        next();
      } catch {
        const error = new ErrorCode("Invalid authorization");
        error.code = 401;
        next(error);
      }
    }
  }
};

export default Auth;
