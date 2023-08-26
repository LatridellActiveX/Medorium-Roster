import type { Request, Response } from "express";
import type {
  ResponseCharacter,
  ResponseCharacters,
  ResponseErrorMessage,
  ResponseMessage,
  ResponseZodError,
} from "../../types.js";
import Character, { CharacterType } from "../models/character.js";
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

export async function replaceCharacter(req: Request, res: Response) {
  const characterSchema = z.object({
    username: z.string().min(6).max(30).trim(),
    name: z.string().min(3).max(37).trim(),
    main: z.boolean(),
    rank: z.union([z.string().min(3).max(30), z.undefined()]),
    rankAcquisitionTimestamp: z.union([z.number(), z.undefined()]),
    division: z.union([z.string().min(3).max(30), z.undefined()]),
    payGrade: z.union([z.string(), z.undefined()]),
  });

  const schema = z.object({
    username: z.string().min(6).max(30).trim(),
    name: z.string().min(3).max(37).trim(),
    character: characterSchema,
  });

  const validation = schema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json(validation.error.issues as ResponseZodError);
  }

  // const username = "testuser";
  // const name = "Main";
  // const character: CharacterType = {
  //   username: "testuser",
  //   name: "Main",
  //   main: true,
  //   division: "Mining",
  //   rank: "Journeyman Technician",
  // };

  const { username, name, character } = validation.data;

  const result = await Character.replaceCharacter(username, name, character);

  if (!result.ok) {
    return res.status(400).json({ error: result.err });
  }

  const { updatedCharacter } = result.val;

  return res.status(200).json(updatedCharacter);
}

export async function deleteLoggedInUserCharacter(req: Request, res: Response) {
  const { name } = req.body;
  const { username } = res.locals;

  const result = await Character.deleteCharacter(username, name);

  if (!result.ok) {
    return res.status(400).json({ error: result.err } as ResponseErrorMessage);
  }

  return res.status(200).json(`Successfully deleted "${name}"`);
}

export async function adminDeleteUserCharacter(req: Request, res: Response) {
  const { username, character } = req.params;

  const result = await Character.deleteCharacter(username, character);

  if (!result.ok) {
    return res.status(400).json({ error: result.err } as ResponseErrorMessage);
  }

  return res
    .status(200)
    .json({
      message: `Successfully deleted character "${character}" of user "${username}"`,
    } as ResponseMessage);
}
