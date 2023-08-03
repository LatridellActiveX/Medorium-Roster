import { ResponseFullRoster } from "api/types";
import Character from "./character";
import cn from 'classnames';

type Props = {
    roster: ResponseFullRoster
    className?: string
}

const Characters: React.FC<Props> = ({ roster, className }) => {
    let Characters = roster.map((c, index) => <Character {...c} key={index} />);

    return <ul className={cn("flex flex-col gap-1", className)}>
        {Characters}
    </ul>
};

export default Characters;