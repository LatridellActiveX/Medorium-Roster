import { useState } from "react";
import TrashIcon from "../../../../../icons/trash";
import Icon from "../icon";
import DeletionConfirmationModal from "./deletionConfirmationModal";
import { ResponseCharacter } from "api/types";

type Props = {
  character: ResponseCharacter;
  admin: boolean;
  refetch: () => void;
};

const Delete: React.FC<Props> = ({ character, admin, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenStatus = () => {
    setIsOpen((prev) => !prev);
  };

  const apiUrl = admin
  ? `/api/users/${character.username}/characters/${character.name}`
  : `/api/characters/${character.name}`

  return (
    <div>
      <Icon action="Delete" name={character.name} onClick={handleOpenStatus}>
        <TrashIcon />
      </Icon>
      <DeletionConfirmationModal
        character={character}
        isOpen={isOpen}
        onClose={handleOpenStatus}
        refetch={refetch}
        apiUrl={apiUrl}
      />
    </div>
  );
};

export default Delete;
