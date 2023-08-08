import cn from "classnames";
import Role from "./role";
import { ResponseCharacter } from "../../../../../api/types";
import TrashIcon from "../../../icons/trash";
import Tooltip from "../../tooltip";

type Props = {
  deleteCharacter?: (name: string) => void;
} & ResponseCharacter;

const Character: React.FC<Props> = ({
  name,
  username,
  main,
  rank,
  division,
  payGrade,
  rankAcquisitionTimestamp,
  deleteCharacter,
}) => {
  const handleDeleteCharacter = () => {
    if (deleteCharacter) {
      deleteCharacter(name);
    }
  };

  return (
    <li className="relative flex justify-between p-2 flex-col h-24 bg-c-primary border-c-border border-2">
      <div className="flex">
        <div className="flex w-80 gap-2">
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

      {deleteCharacter && (
        <div className="absolute top-2 right-2">
          <Tooltip text="Click to delete the character">
            <button
              className="transition-opacity hover:opacity-70"
              aria-label={`Delete ${name} character`}
              onClick={handleDeleteCharacter}
            >
              <TrashIcon />
            </button>
          </Tooltip>
        </div>
      )}
    </li>
  );
};

export default Character;
