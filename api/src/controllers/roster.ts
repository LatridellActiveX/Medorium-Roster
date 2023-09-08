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

const characterSchema = z.object({
  name: z.string().min(3).max(37).trim(),
  main: z.boolean(),
  rank: z.string().min(3).max(30).optional(),
  rankAcquisitionTimestamp: z.number().optional(),
  division: z.string().min(3).max(30).optional(),
  payGrade: z.string().optional(),
});

export async function getAllCharacters(req: Request, res: Response) {
  const result = await Character.getAllCharacters();

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
  const schema = z.object({
    params: z.object({
      username: z.string().min(6).max(30).trim(),
      character: z.string().min(3).max(37).trim(),
    }),
    body: z.object({
      character: z.object({
        username: z.string().min(6).max(30).trim(),
        name: z.string().min(3).max(37).trim(),
        main: z.boolean(),
        rank: z.string().min(3).max(30).optional(),
        rankAcquisitionTimestamp: z.number().optional(),
        division: z.string().min(3).max(30).optional(),
        payGrade: z.string().optional(),
      }),
    }),
  });

  const validation = schema.safeParse({ params: req.params, body: req.body });

  if (!validation.success) {
    return res.status(400).json(validation.error.issues as ResponseZodError);
  }

  const { username, character: name } = validation.data.params;
  const { character } = validation.data.body;

  const result = await Character.replaceCharacter(username, name, character);

  if (!result.ok) {
    return res.status(400).json({ error: result.err });
  }

  return res.status(200).json({ character: result.val.character });
}

export async function replaceLoggedInUserCharacter(
  req: Request,
  res: Response
) {
  const schema = z.object({
    params: z.object({ name: z.string().min(3).max(37).trim() }),
    body: z.object({ character: characterSchema }),
  });

  const validation = schema.safeParse({ params: req.params, body: req.body });

  if (!validation.success) {
    return res.status(400).json(validation.error.issues as ResponseZodError);
  }

  const { username } = res.locals;
  const { name } = validation.data.params;
  const { character } = validation.data.body;

  const result = await Character.replaceCharacter(username, name, {
    username,
    ...character,
  });

  if (!result.ok) {
    return res.status(400).json({ error: result.err });
  }

  return res.status(200).json({ character: result.val.character });
}

export async function deleteLoggedInUserCharacter(req: Request, res: Response) {
  const paramSchema = z.object({
    name: z.string().min(3).max(37).trim(),
  });

  const paramValidation = paramSchema.safeParse(req.params);

  if (!paramValidation.success) {
    return res
      .status(400)
      .json(paramValidation.error.issues as ResponseZodError);
  }

  const { name } = req.params;
  const { username } = res.locals;

  const result = await Character.deleteCharacter(username, name);

  if (!result.ok) {
    return res.status(400).json({ error: result.err } as ResponseErrorMessage);
  }

  return res
    .status(200)
    .json({ message: `Successfully deleted "${name}"` } as ResponseMessage);
}

export async function adminDeleteUserCharacter(req: Request, res: Response) {
  const { username, character } = req.params;

  const result = await Character.deleteCharacter(username, character);

  if (!result.ok) {
    return res.status(400).json({ error: result.err } as ResponseErrorMessage);
  }

  return res.status(200).json({
    message: `Successfully deleted character "${character}" of user "${username}"`,
  } as ResponseMessage);
}
