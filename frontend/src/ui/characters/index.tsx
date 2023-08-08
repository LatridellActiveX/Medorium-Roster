import { ResponseCharacters } from "./../../../../api/types";
import Character from "./character";
import cn from "classnames";

type Props = {
  data: ResponseCharacters;
  isLoading: boolean;
  className?: string;
  deleteCharacter?: (name: string) => void;
};

const Characters: React.FC<Props> = ({ data = [], isLoading, className, deleteCharacter }) => {
  let Characters = data.map((c, index) => <Character {...c} deleteCharacter={deleteCharacter} key={index} />);

  return (
    <ul className={cn("flex flex-col gap-1", className)}>
      {isLoading && <p>Loading...</p>}
      {!isLoading && data.length === 0 && (
        <h6 className="text18-20 text-center">
          There are currently no characters at your disposal.
        </h6>
      )}
      {Characters}
    </ul>
  );
};

export default Characters;
