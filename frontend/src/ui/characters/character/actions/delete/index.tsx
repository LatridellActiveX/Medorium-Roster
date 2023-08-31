import { useState } from "react";
import TrashIcon from "../../../../../icons/trash";
import Icon from "../icon";
import DeletionConfirmationModal from "./deletionConfirmationModal";

type Props = {
  characterName: string;
  username: string;
  refetch: () => void;
};

const Delete: React.FC<Props> = ({ characterName, username, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenStatus = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <Icon action="Delete" name={characterName} onClick={handleOpenStatus}>
        <TrashIcon />
      </Icon>
      <DeletionConfirmationModal
        characterName={characterName}
        username={username}
        isOpen={isOpen}
        onClose={handleOpenStatus}
        refetch={refetch}
      />
    </div>
  );
};

export default Delete;
