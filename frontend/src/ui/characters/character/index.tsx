import cn from "classnames";
import Role from "./role";
import { ResponseCharacter } from "api/types";
import Actions, { ActionType } from "./actions";

type Props = {
  character: ResponseCharacter;
  refetch?: () => void;
  actions?: ActionType[];
};

const Character: React.FC<Props> = ({ character, actions = [], refetch }) => {
  const { name, main, username, division, rank } = character;

  return (
    <li className="relative flex justify-between flex-col border-c-border border-2 bg-c-primary w-full p-2 h-24">
      <div className="flex">
        <div className="flex w-[316px] gap-2">
          <p className="text-white">{name}</p>
          <p className="text-gray-400">({username})</p>
        </div>
        <p className={cn("font-bold", main ? "text-blue-500" : "text-red-400")}>
          {main ? "MAIN" : "ALT"}
        </p>
      </div>

      <div className="grid grid-cols-2">
        <Role role={rank} sign="R" />
        <Role role={division} sign="D" />
      </div>

      <Actions character={character} actions={actions} refetch={refetch} />
    </li>
  );
};

export default Character;
