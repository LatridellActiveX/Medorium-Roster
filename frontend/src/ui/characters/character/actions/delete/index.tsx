import { useState } from "react";
import TrashIcon from "../../../../../pages/icons/trash";
import Icon from "../icon";
import DeletionConfirmationModal from "./deletionConfirmationModal";

type Props = {
  characterName: string;
  username: string;
  refetch: () => void;
  requestUrl?: string
};

const Delete: React.FC<Props> = ({ characterName, username, refetch, requestUrl }) => {
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
        requestUrl={requestUrl}
      />
    </div>
  );
};

export default Delete;
