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
  rank: { type: String },
  rankAcquisitionTimestamp: { type: Number },
  division: { type: String },
  payGrade: { type: String },
  __v: { type: Number, select: false },
});

export const CharacterModel = model("Character", CharacterSchema);

class Character {
  static async getAllCharacters() {
    try {
      const characters = await CharacterModel.find({});
      return Ok({ characters });
    } catch (_e) {
      const error = _e as MongoError;
      console.error("UNHANDLED ERROR:", error);
      return Err("Could not fetch full roster");
    }
  }

  static async getAllUserCharacters(username: string) {
    try {
      const characters = await CharacterModel.find({ username });
      return Ok({ characters: characters });
    } catch (_e) {
      const error = _e as MongoError;
      console.error("UNHANDLED ERROR:", error);
      return Err("Could not fetch full roster");
    }
  }

  static async createCharacter(username: string, name: string, main: boolean) {
    try {
      const findResult = await this.getAllUserCharacters(username);
      if (!findResult.ok) return Err("Something went wrong");

      const { characters } = findResult.val;
      const mainCharacterExists = characters.some((c) => c.main);

      if (mainCharacterExists) return Err("Main character already exists");

      const character = await CharacterModel.create({
        username,
        name,
        main,
      });
      return Ok({ character: character.toObject({ versionKey: false }) });
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

  /**
   * Replaces the existing document that matches username and name with a new character
   */
  static async replaceCharacter(
    username: string,
    name: string,
    newCharacter: CharacterType
  ) {
    try {
      if (newCharacter.main) {
        const existingMainCharacter = (
          await CharacterModel.findOne({
            main: true,
          })
        )?.toObject();

        if (existingMainCharacter && existingMainCharacter.name !== name) {
          return Err("Main character already exists");
        }
      }

      const character = await CharacterModel.findOneAndUpdate(
        {
          username,
          name,
        },
        newCharacter,
        { new: true }
      );

      if (character === null) {
        return Err("Character does not exist");
      }
      return Ok({ character: character.toObject({ versionKey: false }) });
    } catch (_e) {
      const error = _e as MongoError;
      console.error("UNHANDLED ERROR:", error);
      return Err("Something went wrong");
    }
  }

  static async deleteCharacter(username: string, name: string) {
    try {
      const result = await CharacterModel.deleteOne({
        username,
        name,
      });

      if (result.deletedCount !== 1) {
        return Err("Character does not exist");
      }

      return Ok({ deleted: true });
    } catch (_e) {
      const error = _e as MongoError;
      console.error("UNHANDLED ERROR:", error);
      return Err("Something went wrong");
    }
  }
}

export default Character;
