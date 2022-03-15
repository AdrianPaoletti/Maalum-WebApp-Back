import { Schema, model } from "mongoose";

export interface IUser {
  username: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema, "users");

export default User;
