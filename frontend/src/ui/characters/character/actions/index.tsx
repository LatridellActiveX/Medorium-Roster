import { ResponseCharacter } from "api/types";
import Delete from "./delete";
import Update from "./update";

export type ActionType = {
  action: "Delete" | "Update";
  admin: boolean;
};

type Props = {
  character: ResponseCharacter;
  actions: ActionType[];
  refetch?: () => void;
};

const getAction = (actions: ActionType[], name: "Delete" | "Update") => {
  return actions.find((a) =>
    typeof a === "object" ? a.action === name : a === name
  );
};

const Actions: React.FC<Props> = ({ character, actions, refetch }) => {
  if (!refetch || !actions) {
    return <></>;
  }

  const updateAction = getAction(actions, "Update");
  const deleteAction = getAction(actions, "Delete");

  return (
    <div className="absolute top-2 right-2 flex gap-x-4">
      {updateAction && (
        <Update
          character={character}
          admin={updateAction.admin}
          refetch={refetch}
        />
      )}
      {deleteAction && (
        <Delete
          character={character}
          admin={deleteAction.admin}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Actions;
