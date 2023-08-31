import { ResponseCharacter } from "api/types";
import EditIcon from "../../../../../icons/edit";
import Icon from "../icon";
import UpdateCharacterModal from "./updateCharacterModal";
import { useState } from "react";

type Props = {
  character: ResponseCharacter;
  refetch: () => void;
};

const Update: React.FC<Props> = ({ character, refetch }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditModeStatus = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <div>
      <Icon action="Edit" name={character.name} onClick={handleEditModeStatus}>
        <EditIcon className="mt-[-1px]" />
      </Icon>
      <UpdateCharacterModal
        character={character}
        isOpen={isEditMode}
        onClose={handleEditModeStatus}
        refetch={refetch}
      />
    </div>
  );
};

export default Update;
