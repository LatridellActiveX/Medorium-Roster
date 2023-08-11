import type { CharacterType as Character } from "./src/models/character.ts";

export type ResponseErrorMessage = {
  error: string;
};

export type ResponseZodError = {
  code: string;
  minimum: number;
  type: string;
  inclusive: boolean;
  exact: boolean;
  message: string;
  path: string[];
}[];

export type ResponseIsAuthorized = {
  authorized: boolean;
  username: string;
  isAdmin: boolean;
};

export type ResponseCharacter = Character;
export type ResponseCharacters = Character[];
