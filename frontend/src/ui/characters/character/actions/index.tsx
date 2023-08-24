import { ResponseCharacter } from "api/types";
import Delete from "./delete";
import Update from "./update";

export type ActionsType = ("Delete" | "Update")[];

type Props = {
  character: ResponseCharacter;
  actions?: ActionsType;
  refetch?: () => void;
};

const Actions: React.FC<Props> = ({ character, actions, refetch }) => {
  if (!refetch || !actions) {
    return <></>;
  }

  return (
    <div className="absolute top-2 right-2 flex gap-x-4">
      {actions.includes('Update') && <Update character={character} refetch={refetch} />}
      {actions.includes('Delete') && <Delete name={character.name} refetch={refetch} />}
    </div>
  );
};

export default Actions;
