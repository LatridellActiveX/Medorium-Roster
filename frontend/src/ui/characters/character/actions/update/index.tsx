import { ResponseCharacter } from "api/types";
import EditIcon from "../../../../../icons/edit";
import Icon from "../icon";
import UpdateCharacterModal from "./updateCharacterModal";
import { useState } from "react";

type Props = {
  character: ResponseCharacter;
  refetch: () => void;
  admin: boolean;
};

const Update: React.FC<Props> = ({ character, refetch, admin }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditModeStatus = () => {
    setIsEditMode((prev) => !prev);
  };

  const apiUrl = admin
    ? `/api/users/${character.username}/characters/${character.name}`
    : `/api/characters/${character.name}`

  return (
    <div>
      <Icon action="Edit" name={character.name} onClick={handleEditModeStatus}>
        <EditIcon className="mt-[-1px]" />
      </Icon>
      <UpdateCharacterModal
        character={character}
        isOpen={isEditMode}
        apiUrl={apiUrl}
        onClose={handleEditModeStatus}
        refetch={refetch}
      />
    </div>
  );
};

export default Update;
