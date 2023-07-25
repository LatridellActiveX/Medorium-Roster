import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

declare module "jsonwebtoken" {
  export interface JwtPayload {
    username: string;
  }
}

const JWT_SECRET = process.env.JWT_SECRET;
if (JWT_SECRET === undefined) {
  throw new Error("JWT_SECRET must contain a secret key in .env");
}

export const createAuthToken = (username: string): string => {
  const token = jwt.sign({ username }, JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

export const decodeAuthToken = (token: string): JwtPayload | undefined => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return payload;
  } catch (_) {
    return undefined;
  }
};