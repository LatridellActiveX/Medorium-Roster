import type { Request, Response } from "express";
import type {
  ResponseCharacter,
  ResponseCharacters,
  ResponseErrorMessage,
  ResponseZodError,
} from "../../types.js";
import Character from "../models/character.js";
import { z } from "zod";

export async function getAllCharacters(req: Request, res: Response) {
  const result = await Character.getAllCharacters();

  console.log(result);
  if (!result.ok) {
    return res.status(400).json({ error: result.err });
  }

  res.status(200).json(result.val.characters);
}

export async function getUserCharacters(req: Request, res: Response) {
  const { username } = res.locals;
  const result = await Character.getAllUserCharacters(username);
  if (!result.ok) {
    return res.status(400).json({ error: result.err });
  }

  const { characters } = result.val;

  res.status(200).json(characters as ResponseCharacters);
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

  const result = await Character.createCharacter(username, name, main);

  if (!result.ok) {
    return res.status(400).json({ error: result.err } as ResponseErrorMessage);
  }

  const { character } = result.val;
  return res.status(200).json(character as ResponseCharacter);
}

export async function deleteUserCharacters(req: Request, res: Response) {
  const { name }  = req.body;
  const { username } = res.locals;

  const result = await Character.deleteCharacter(username, name);

  if (!result.ok) {
    return res.status(400).json({ error: result.err } as ResponseErrorMessage);
  }

  return res.status(200).json(`Successfully deleted "${name}"`);
}
