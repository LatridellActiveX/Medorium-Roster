import { ResponseCharacters } from "api/types";
import Character from "./character";
import cn from "classnames";
import { ActionsType } from "./character/actions";

type Props = {
  data: ResponseCharacters;
  isLoading: boolean;
  className?: string;
  refetch?: () => void;
  actions?: ActionsType
};

const Characters: React.FC<Props> = ({
  data = [],
  isLoading,
  className,
  refetch,
  actions
}) => {
  let Characters = data.map((c) => (
    <Character refetch={refetch} actions={actions} character={c} key={c.name} />
  ));

  return (
    <ul className={cn("flex flex-col gap-1", className)}>
      {isLoading && data.length === 0 && <p>Loading...</p>}
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
