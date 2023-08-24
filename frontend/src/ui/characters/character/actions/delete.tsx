import axios from "../../../../api/axios";
import TrashIcon from "../../../../icons/trash";
import Icon from "./icon";

type Props = {
  name: string;
  refetch: () => void;
};

const Delete: React.FC<Props> = ({ name, refetch }) => {
  const handleClick = () => {
    axios.delete("api/characters", {
      data: {
        name,
      },
    });
    refetch();
  };

  return (
    <Icon action="Delete" name={name} onClick={handleClick}>
      <TrashIcon />
    </Icon>
  );
};

export default Delete;
