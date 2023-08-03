import { ResponseCharacters } from "api/types";
import Character from "./character";
import cn from 'classnames';

type Props = {
    data: ResponseCharacters
    className?: string
}

const Characters: React.FC<Props> = ({ data, className }) => {
    let Characters = data.map((c, index) => <Character {...c} key={index} />);

    return <ul className={cn("flex flex-col gap-1", className)}>
        {Characters}
    </ul>
};

export default Characters;