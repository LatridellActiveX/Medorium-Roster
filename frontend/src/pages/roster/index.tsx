import axios from "axios";
import cn from "classnames";
import { useEffect, useState } from "react";

interface RosterMember {
  characterName: string;
  userName: string;
  rank: string;
  division: string;
  mainAccount: boolean;
}

const RosterPage: React.FC = () => {
  const [roster, setRoster] = useState<RosterMember[]>([]);

  useEffect(() => {
    pullRoster();
  }, []);

  const pullRoster = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/roster");
      const members: RosterMember[] = response.data.members;
      setRoster(members);
    } catch (error) {
      console.error("Fatal Server Communication Error: ", error);
    }
  };

  return (
    <main>
      <div className="w-[600px]">

        <ul className="flex flex-col gap-1">
          {roster.map((member, i) => (
            <li key={i} className="flex justify-between p-2 flex-col h-24 bg-[#202325] border-[#2F3438] border-2">
              <div className="flex">
                <div className="flex w-80 gap-2">
                  <p className="">
                    {member.characterName}
                  </p>
                  <p className="text-gray-400">
                    ({member.userName})
                  </p>
                </div>
                <p className={cn({
                  "text-blue-500": member.mainAccount,
                  "text-red-400": !member.mainAccount,
                  "font-bold": true,
                })}>{member.mainAccount ? "MAIN" : "ALT"}</p>
              </div>

              <div className="flex">
                <p className="w-80 gap-2"><span className="text-gray-500">[R]</span> {member.rank}</p>
                <p><span className="text-gray-500">[D]</span> {member.division}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default RosterPage;
