import { ResponseCharacter } from "api/types";
import EditIcon from "../../../../../icons/edit";
import Icon from "../icon";
import UpdateCharacterModal from "./updateCharacterModal";
import { useState } from "react";

type Props = {
  character: ResponseCharacter;
  refetch: () => void;
  requestUrl?: string;
};

const Update: React.FC<Props> = ({ character, refetch, requestUrl }) => {
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
        requestUrl={requestUrl}
        onClose={handleEditModeStatus}
        refetch={refetch}
      />
    </div>
  );
};

export default Update;
