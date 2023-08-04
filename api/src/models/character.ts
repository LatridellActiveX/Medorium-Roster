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

export const CharacterSchema = new Schema<CharacterType>({
  username: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  main: { type: Boolean, required: true },
  rank: { type: Boolean },
  rankAcquisitionTimestamp: { type: String },
  division: { type: String },
  payGrade: { type: String },
});

export const CharacterModel = model("Character", CharacterSchema);

class Character {
  static async getFullRoster() {
    return [
      {
        name: "Wingedminer",
        username: "wingedguy",
        main: false,
        rank: "Journeyman Technician",
        division: "Mining",
      },
      {
        name: "Wingedfall",
        username: "wingedguy",
        main: false,
        rank: "Journeyman Technician",
        division: "Mining",
      },
      {
        name: "Wingedfaith",
        username: "wingedguy",
        main: true,
        rank: "Section Foreman",
        division: "Mining",
      },
      {
        name: "Wingedarc",
        username: "wingedguy",
        main: false,
        rank: "Technician",
        division: "Mining",
      },
      {
        name: "Benjamin Thomson",
        username: "latridell",
        main: true,
        rank: "Chief Financial Officer (CFO)",
        division: "Front Office",
      },
      {
        name: "Josaline Thomson",
        username: "latridell",
        main: false,
      },
      {
        name: "Jericho Thomson",
        username: "latridell",
        main: false,
      },
    ];
  }
  static async createCharacter(username: string, name: string, main: boolean) {
    try {
      console.log({ username, name, main });
      const result = await CharacterModel.create({
        username,
        name,
        main,
      });
      return Ok({ character: result.toObject({versionKey: false}) });
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
}

export default Character;
