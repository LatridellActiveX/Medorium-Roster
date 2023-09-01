import { ResponseCharacters } from "api/types";
import Character from "./character";
import cn from "classnames";
import { ActionType } from "./character/actions";
import { CharacterType } from "../../../../api/src/models/character";

export type Filter = "Default" | "Main" | "Alt";
export type Sort = "Default" | "A-Z" | "Z-A";

type Props = {
  data: ResponseCharacters;
  isLoading: boolean;
  className?: string;
  refetch?: () => void;
  actions?: ActionType[];
  filter?: Filter;
  sort?: Sort;
  search?: string;
};

const Characters: React.FC<Props> = ({
  data = [],
  isLoading,
  className,
  refetch,
  actions,
  filter = "Default",
  sort = "Default",
  search = "",
}) => {
  const filters: {
    [key in Filter]: (c: CharacterType) => boolean;
  } = {
    "Default": (_c) => (true),
    "Main": (c) => (c.main),
    "Alt": (c) => (!c.main),
  }

  const sorts: {
    [key in Sort]: (a: CharacterType, b: CharacterType) => number;
  } = {
    "Default": (_a, _b) => 0,
    "A-Z": (a, b) => a.name.localeCompare(b.name),
    "Z-A": (a, b) => b.name.localeCompare(a.name),
  }

  let Characters = data
    .filter(filters[filter])
    .filter((c) => {
      if (search === "") return true;
      const searchTerms = [c.name, c.username, c.rank ?? "N/A", c.division ?? "N/A"]
        .map(term => term.toLowerCase());
      return searchTerms.some(term => term.includes(search.toLowerCase()));
    }
    )
    .sort(sorts[sort])
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
