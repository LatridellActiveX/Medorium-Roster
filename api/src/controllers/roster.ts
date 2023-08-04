import type { Request, Response } from "express";
import type {
  ResponseCharacter,
  ResponseCharacters,
  ResponseErrorMessage,
  ResponseZodError,
} from "../../types.js";
import Character, { CharacterType } from "../models/character.js";
import { z } from "zod";
import { ResultOk } from "resultat";

export async function getFullRoster(req: Request, res: Response) {
  const characters: ResponseCharacters = await Character.getFullRoster();

  res.status(200).json(characters);
}

export async function getUserCharacters(req: Request, res: Response) {
  const characters: ResponseCharacters = [
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

  return res.status(200).json(characters);
}

export async function createCharacter(req: Request, res: Response) {
  console.log(req.body);
  const schema = z.object({
    name: z.string().min(3).max(37).trim(), // according to EVE Online Naming Policy
    main: z.boolean(),
  });

  const validation = schema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json(validation.error.issues as ResponseZodError);
  }

  const { name, main } = validation.data;

  const { username } = res.locals;

  console.log({ username, name, main });
  const result = await Character.createCharacter(username, name, main);
  console.log(result);
  if (!result.ok) {
    return res.status(400).json({ error: result.err } as ResponseErrorMessage);
  }

  const { character } = result.val;
  return res.status(200).json(character as ResponseCharacter);
}
