import type { Character as CharacterType } from 'api/types';
import cn from 'classnames';
import Role from "./role";

type Props = {

} & CharacterType;

const Character: React.FC<Props> = ({ name, username, main, rank, division, payGrade, rankAcquisitionTimestamp }) => {

    return <li
        className="flex justify-between p-2 flex-col h-24 bg-c-primary border-c-border border-2"
    >
        <div className="flex">
            <div className="flex w-80 gap-2">
                <p className="">{name}</p>
                <p className="text-gray-400">({username})</p>
            </div>
            <p
                className={cn(
                    'font-bold',
                    main ? 'text-blue-500' : 'text-red-400'
                )}
            >
                {main ? "MAIN" : "ALT"}
            </p>
        </div>

        <div className="flex">
            <Role role={rank} sign='R' />
            <Role role={division} sign='D' />
        </div>
    </li>
};

export default Character;