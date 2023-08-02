import { Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";
import { MongoError } from "mongodb";
import { Err, Ok } from "resultat";

export interface IUser {
  name: string;
  hash: string;
  timezone?: unknown;
  enlistedTimestamp?: number; // Joined the corporation, time in service can be calculated
}

//Mongoose schema for user
export const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
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
  static async register(name: string, password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    try {
      const doc = await UserModel.create({
        name,
        hash,
      });
      return Ok({ user: doc.toObject() });
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

    return Ok(1);
  }
}

export default User;
