import { useState } from "react";
import TrashIcon from "../../../../../icons/trash";
import Icon from "../icon";
import DeletionConfirmationModal from "./deletionConfirmationModal";

type Props = {
  characterName: string;
  refetch: () => void;
};

const Delete: React.FC<Props> = ({ characterName, refetch }) => {
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
        accountName={characterName}
        isOpen={isOpen}
        onClose={handleOpenStatus}
        refetch={refetch}
        characterName={characterName}
      />
    </div>
  );
};

export default Delete;
