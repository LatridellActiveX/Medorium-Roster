import type { Request, Response } from "express";


export async function getMembersData(req: Request, res: Response) {

    // hard-coded members data, it should be replaced when schema is created in mongodb
    const mockMembers = [
        {
          characterName: "Character 1",
          userName: "User 1",
          rank: "Journeyman Technician",
          division: "Mining",
          mainAccount: true, // mainAccount ? "MAIN": "ALT";
        },
        {
          characterName: "Character 2",
          userName: "User 1",
          rank: "Journeyman Technician",
          division: "Mining",
          mainAccount: false,
        },
        {
          characterName: "Character 3",
          userName: "User Name",
          rank: "Journeyman Technician",
          division: "Mining",
          mainAccount: false,
        },
      ];
    
    res.status(200).json({members: mockMembers});
}