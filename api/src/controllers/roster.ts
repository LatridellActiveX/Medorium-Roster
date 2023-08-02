import type { Request, Response } from "express";

interface ICharacter {
  name: string;
  username: string;
  main: boolean;
  rank?: string;
  rankAcquisitionTimestamp?: number;
  division?: string;
  payGrade?: string;
}

export async function getFullRoster(req: Request, res: Response) {
  // this hard-coded data should be replaced with Character.getAllCharacter()
  const mockCharacters: ICharacter[] = [
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
      rank: "N/A",
      division: "N/A",
    },
    {
      name: "Jericho Thomson",
      username: "latridell",
      main: false,
      rank: "N/A",
      division: "N/A",
    },
  ];

  res.status(200).json({ roster: mockCharacters });
}
