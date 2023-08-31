import { ResponseCharacters } from "api/types";
import Character from "./character";
import cn from "classnames";
import { ActionsType } from "./character/actions";
import { CharacterType } from "../../../../api/src/models/character";

type Filter = "Main" | "Alt";
type Sort = "A-Z" | "Z-A";

type Props = {
  data: ResponseCharacters;
  isLoading: boolean;
  className?: string;
  refetch?: () => void;
  actions?: ActionsType;
  filter?: Filter;
  sort?: Sort;
};

const Characters: React.FC<Props> = ({
  data = [],
  isLoading,
  className,
  refetch,
  actions,
  filter,
  sort
}) => {
  const sorts: {
    [key in Sort]: (a: CharacterType, b: CharacterType) => number;
  } = {
    "A-Z": (a, b) => a.name.localeCompare(b.name),
    "Z-A": (a, b) => b.name.localeCompare(a.name),
  }

  const filters: {
    [key in Filter]: (c: CharacterType) => boolean;
  } = {
    "Main": (c) => (c.main),
    "Alt": (c) => (!c.main),
  }

  let Characters = data
    .filter(filter ? filters[filter] : () => true)
    .sort(sort ? sorts[sort] : () => 0)
    .map((c) => (
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
