import cn from "classnames";
import Role from "./role";
import { ResponseCharacter } from "api/types";
import Actions, { ActionType } from "./actions";

type Props = {
  character: ResponseCharacter;
  refetch?: () => void;
  actions?: ActionType[];
};

const Character: React.FC<Props> = ({ character, actions, refetch }) => {
  const {
    name,
    main,
    username,
    division,
    rank,
  } = character;

  return (
    <li className="relative flex justify-between p-2 flex-col h-24 bg-c-primary border-c-border border-2">
      <div className="flex">
        <div className="flex w-[316px] gap-2">
          <p className="">{name}</p>
          <p className="text-gray-400">({username})</p>
        </div>
        <p className={cn("font-bold", main ? "text-blue-500" : "text-red-400")}>
          {main ? "MAIN" : "ALT"}
        </p>
      </div>

      <div className="flex">
        <Role role={rank} sign="R" />
        <Role role={division} sign="D" />
      </div>

      <Actions
        character={character}
        actions={actions}
        refetch={refetch}
      />
    </li>
  );
};

export default Character;
