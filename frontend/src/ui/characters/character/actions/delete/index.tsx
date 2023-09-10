import TrashIcon from "../../../../../icons/trash";
import Icon from "../icon";
import DeletionConfirmationModal from "./deletionConfirmationModal";
import { ResponseCharacter } from "api/types";
import useModalControllers from "../../../../../hooks/useModalControllers";

type Props = {
  character: ResponseCharacter;
  admin: boolean;
  refetch: () => void;
};

const Delete: React.FC<Props> = ({ character, admin, refetch }) => {
  const { modalQuery, closeModal, openModal } = useModalControllers(
    {
      id: character.name,
      name: "delete",
    }
  );

  const apiUrl = admin
    ? `/api/users/${character.username}/characters/${character.name}`
    : `/api/characters/${character.name}`;

  return (
    <div>
      <Icon action="Delete" name={character.name} onClick={openModal}>
        <TrashIcon />
      </Icon>
      <DeletionConfirmationModal
        character={character}
        query={modalQuery}
        onClose={closeModal}
        refetch={refetch}
        apiUrl={apiUrl}
      />
    </div>
  );
};

export default Delete;
