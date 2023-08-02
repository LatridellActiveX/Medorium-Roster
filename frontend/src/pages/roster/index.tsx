import axios from "axios";
import cn from "classnames";
import { useEffect, useState } from "react";

interface Character {
  name: string;
  username: string;
  main: boolean;
  rank?: string;
  rankAcquisitionTimestamp?: number;
  division?: string;
  payGrade?: string;
}

const RosterPage: React.FC = () => {
  const [roster, setRoster] = useState<Character[]>([]);

  useEffect(() => {
    pullRoster();
  }, []);

  const pullRoster = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/roster");
      const roster: Character[] = response.data.roster;
      setRoster(roster);
    } catch (error) {
      console.error("Fatal Server Communication Error: ", error);
    }
  };

  return (
    <main>
      <div className="w-[600px]">
        <ul className="flex flex-col gap-1">
          {roster.map((character, i) => (
            <li
              key={i}
              className="flex justify-between p-2 flex-col h-24 bg-[#202325] border-[#2F3438] border-2"
            >
              <div className="flex">
                <div className="flex w-80 gap-2">
                  <p className="">{character.name}</p>
                  <p className="text-gray-400">({character.username})</p>
                </div>
                <p
                  className={cn({
                    "text-blue-500": character.main,
                    "text-red-400": !character.main,
                    "font-bold": true,
                  })}
                >
                  {character.main ? "MAIN" : "ALT"}
                </p>
              </div>

              <div className="flex">
                <p className="w-80 gap-2">
                  <span className="text-gray-500">[R]</span> {character.rank}
                </p>
                <p>
                  <span className="text-gray-500">[D]</span>{" "}
                  {character.division}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default RosterPage;
