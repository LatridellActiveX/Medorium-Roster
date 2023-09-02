import { Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";
import { Err, Ok } from "resultat";
import type { MongoError } from "mongodb";

type UserType = {
  name: string;
  hash: string;
  isAdmin: boolean;
  timezone?: string;
  enlistedTimestamp?: number;
};

export const UserSchema = new Schema<UserType>({
  name: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  timezone: { type: String, required: false },
  enlistedTimestamp: { type: Number, required: false },
});

export const UserModel = model("User", UserSchema);

class User {
  static async findByUsername(name: string) {
    const user = await UserModel.findOne({ name }).lean();
    return user;
  }

  /**
   * Creates a new user if name is not taken
   */
  static async register(
    name: string,
    password: string,
    options?: { admin?: boolean }
  ) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    try {
      const user = await UserModel.create({
        name: name,
        hash,
        isAdmin: options?.admin,
      });
      return Ok({ user: user.toObject() });
    } catch (_e) {
      const error = _e as MongoError;
      if (error.code === 11000) {
        // Duplicate key error
        return Err("Name is already in use");
      }
      console.error("UNHANDLED ERROR:", error);
      return Err("Something went wrong");
    }
  }

  static async login(name: string, password: string) {
    const user = await UserModel.findOne({ name }).lean();

    if (user === null) {
      return Err("Incorrect username");
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.hash);

    if (!passwordIsCorrect) {
      return Err("Incorrect password");
    }

    return Ok({ user });
  }
}

export default User;
