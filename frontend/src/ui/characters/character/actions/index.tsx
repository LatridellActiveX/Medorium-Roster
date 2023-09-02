import { ResponseCharacter } from "api/types";
import Delete from "./delete";
import Update from "./update";

export type ActionType =
  | ("Delete" | "Update")
  | {
      action: "Delete" | "Update";
      url: string;
    };

type Props = {
  character: ResponseCharacter;
  actions?: ActionType[];
  refetch?: () => void;
};

const doesActionExist = (actions: ActionType[], name: "Delete" | "Update") => {
  let action = actions.find((a) =>
    typeof a === "object" ? a.action === name : a === name
  );

  return {
    doesExist: action !== undefined,
    url: typeof action === "object" ? action.url : undefined,
  };
};

const Actions: React.FC<Props> = ({ character, actions, refetch }) => {
  if (!refetch || !actions) {
    return <></>;
  }

  const updateAction = doesActionExist(actions, "Update");
  const deleteAction = doesActionExist(actions, "Delete");

  return (
    <div className="absolute top-2 right-2 flex gap-x-4">
      {updateAction.doesExist && (
        <Update
          character={character}
          refetch={refetch}
          requestUrl={updateAction.url}
        />
      )}
      {deleteAction.doesExist && (
        <Delete
          username={character.username}
          characterName={character.name}
          refetch={refetch}
          requestUrl={deleteAction.url}
        />
      )}
    </div>
  );
};

export default Actions;
