import type { Request, Response } from "express";
import type { Character } from "../../types.js";

export async function getFullRoster(req: Request, res: Response) {
  // this hard-coded data should be replaced with Character.getAllCharacter()
  const characters: Character[] = [
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

  res.status(200).json(characters);
}
