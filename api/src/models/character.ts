import { Schema, model } from "mongoose";
import type { MongoError } from "mongodb";
import { Err, Ok } from "resultat";

export type CharacterType = {
  username: string;
  name: string;
  main: boolean;
  rank?: string;
  rankAcquisitionTimestamp?: number;
  division?: string;
  payGrade?: string;
};

export const CharacterSchema = new Schema<CharacterType & { __v: number }>({
  username: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  main: { type: Boolean, required: true },
  rank: { type: Boolean },
  rankAcquisitionTimestamp: { type: Number },
  division: { type: String },
  payGrade: { type: String },
  __v: { type: Number, select: false },
});

export const CharacterModel = model("Character", CharacterSchema);

class Character {
  static async getAllCharacters() {
    try {
      const result = await CharacterModel.find({});
      return Ok({ characters: result });
    } catch (_e) {
      const error = _e as MongoError;
      console.error("UNHANDLED ERROR:", error);
      return Err("Could not fetch full roster");
    }
  }

  static async getAllUserCharacters(username: string) {
    try {
      const result = await CharacterModel.find({ username });
      return Ok({ characters: result });
    } catch (_e) {
      const error = _e as MongoError;
      console.error("UNHANDLED ERROR:", error);
      return Err("Could not fetch full roster");
    }
  }

  static async createCharacter(username: string, name: string, main: boolean) {
    try {
      const result = await CharacterModel.create({
        username,
        name,
        main,
      });
      return Ok({ character: result.toObject({ versionKey: false }) });
    } catch (_e) {
      const error = _e as MongoError;
      console.log(error);
      if (error.code === 11000) {
        // Duplicate key error
        return Err("Name is already in use");
      }
      console.error("UNHANDLED ERROR:", error);
      return Err("Something went wrong");
    }
  }

  static async deleteCharacter(username: string, name: string) {
    try {
      let result = await CharacterModel.deleteOne({
        username,
        name
      })
      
      if (result.deletedCount === 1) {
        return Ok({ deleted: true });
      }
      
      return Err('No such character');
    } catch (_e) {
      const error = _e as MongoError;
      console.log(error);

      console.error("UNHANDLED ERROR:", error);
      return Err("Something went wrong");
    }
  }
}

export default Character;
