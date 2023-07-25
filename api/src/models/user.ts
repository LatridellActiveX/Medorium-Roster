import { Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";
import { MongoError } from "mongodb";
import { Err, Ok } from "resultat";

export interface IUser {
  name: string;
  hash: string;
  rank?: string;
  division?: string;
  payGrade?: string;
  timezone?: unknown;
  rankAcquisitionTimestamp?: number; // Acquired the rank, time in rank can be calculated
  enlistedTimestamp?: number; // Joined the corporation, time in service can be calculated
}

export const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  rank: { type: String, required: false },
  division: { type: String, required: false },
  payGrade: { type: String, required: false },
  timezone: { type: String, required: false },
  rankAcquisitionTimestamp: { type: Number, required: false },
  enlistedTimestamp: { type: Number, required: false },
});

export const UserModel = model("User", UserSchema);

class User {
  static async findByUsername(name: string) {
    const doc = await UserModel.findOne({ name });
    return doc;
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
      return Ok({ doc });
    } catch (_e) {
      const error = _e as MongoError;
      if (error.code === 11000) {
        return Err("Name is already in use");
      }
      console.error("UNHANDLED ERROR:", error);
      return Err("Something went wrong");
    }
  }

  /**
   *
   */
  static async login(name: string, password: string) {
    // TODO: query the database for the user
    const user = await UserModel.findOne({ name });

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
