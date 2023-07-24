import type { Request, Response } from "express";
import User from "../models/user.js";

export async function register(req: Request, res: Response) {
  const { username, password } = req.body;
  const { accessCode } = req.params; // TODO: validate schema
  // TODO: check if accessCode is valid

  console.log(req.params);
  console.log(req.body);

  // TODO: replace this with a schema validation library like Zod/Joi/Yup
  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Invalid body parameters" });
  }

  const result = await User.register(username, password);

  if (!result.ok) {
    return res.status(400).json({ error: result.err });
  }

  const { doc } = result.val;

  console.log(doc);

  return res
    .status(200)
    .json({ message: `Successfully registered user with name '${doc.name}'` });
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body; // TODO: validate schema

  console.log(req.body);

  // TODO: replace this with a schema validation library like Zod/Joi/Yup
  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Invalid body parameters" });
  }

  const result = await User.login(username, password);

  if (!result.ok) {
    return res.status(400).json({ error: result.err });
  }

  const { token } = result.val;

  res.status(200).json({ token }); // The auth token can be sent as cookie aswell
}
