import cn from "classnames";
import Role from "./role";
import { ResponseCharacter } from "api/types";
import Actions, { ActionType } from "./actions";
import { FC, ReactNode } from "react";

type Props = {
  character: ResponseCharacter;
  refetch?: () => void;
  actions?: ActionType[];
  Wrapper?: FC<{ children: ReactNode; className?: string }>;
};

const Character: React.FC<Props> = ({
  character,
  actions,
  refetch,
  Wrapper = ({ children, className }) => <li className={className}>{children}</li>,
}) => {
  const { name, main, username, division, rank } = character;

  return (
    <li className="relative bg-c-primary w-full">
      <Wrapper className="flex justify-between p-2 h-24 flex-col border-c-border border-2">
        <div className="flex">
          <div className="flex w-[316px] gap-2">
            <p className="text-white">{name}</p>
            <p className="text-gray-400">({username})</p>
          </div>
          <p
            className={cn("font-bold", main ? "text-blue-500" : "text-red-400")}
          >
            {main ? "MAIN" : "ALT"}
          </p>
        </div>

        <div className="grid grid-cols-2">
          <Role role={rank} sign="R" />
          <Role role={division} sign="D" />
        </div>

        <Actions character={character} actions={actions} refetch={refetch} />
      </Wrapper>
    </li>
  );
};

export default Character;
