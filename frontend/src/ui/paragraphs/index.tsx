import { useLocation } from "react-router-dom";
import Paragraph, { ParagraphType } from "./paragraph";
import cn from 'classnames';
import formatHash from "../../helpers/formatHash";

type Props = {
    data: ParagraphType[]
    className?: string
    itemClassNames?: {
        className?: string
        headingClassName?: string
        textsContainerClassName?: string
        textClassName?: string
    }
}

const Paragraphs: React.FC<Props> = ({ data, className, itemClassNames }) => {
    const location = useLocation();

    let Paragraphs = data.map((p) => <Paragraph
        isActive={formatHash(location.hash) === (p.id || p.heading.replaceAll(' ', '-'))}
        {...itemClassNames} {...p}
        key={p.heading}
    />);

    return <div className={cn('flex flex-col', className)}>
        {Paragraphs}
    </div>
};

export default Paragraphs;