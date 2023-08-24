import { ResponseCharacter } from "api/types";
import axios from "../../../../../api/axios";
import EditIcon from "../../../../../icons/edit";
import Icon from "../icon";

type Props = {
  character: ResponseCharacter;
  refetch: () => void;
};

const Update: React.FC<Props> = ({ character, refetch }) => {
  const handleClick = () => {
    axios.put('/api/characters', {
      
    })
    refetch();
  };

  return (
    <Icon action="Edit" name={character.name} onClick={handleClick}>
      <EditIcon />
    </Icon>
  );
};

export default Update;
