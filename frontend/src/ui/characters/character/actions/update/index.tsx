import { ResponseCharacter } from "api/types";
import EditIcon from "../../../../../icons/edit";
import Icon from "../icon";
import UpdateCharacterModal from "./updateCharacterModal";
import useModalControllers from "../../../../../hooks/useModalControllers";

type Props = {
  character: ResponseCharacter;
  refetch: () => void;
  admin: boolean;
};

const Update: React.FC<Props> = ({ character, refetch, admin }) => {
  const { modalQuery, isOpen, closeModal, openModal } = useModalControllers({
    id: character.name,
    name: "update",
  });

  const apiUrl = admin
    ? `/api/users/${character.username}/characters/${character.name}`
    : `/api/characters/${character.name}`;

  return (
    <div>
      <Icon action="Edit" name={character.name} onClick={openModal}>
        <EditIcon className="mt-[-1px]" />
      </Icon>
      <UpdateCharacterModal
        character={character}
        query={modalQuery}
        isOpen={isOpen}
        apiUrl={apiUrl}
        onClose={closeModal}
        refetch={refetch}
      />
    </div>
  );
};

export default Update;
