import { ResponseFullRoster } from "api/types";
import Character from "./character";

type Props = {
    roster: ResponseFullRoster
}

const Characters: React.FC<Props> = ({ roster }) => {
    let Characters = roster.map((c, index) => <Character {...c} key={index} />);

    return <ul className="flex flex-col gap-1">
        {Characters}
    </ul>
};

export default Characters;