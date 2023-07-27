import cn from 'classnames';
import { Link } from 'react-router-dom';

export type ParagraphType = {
    heading: string
    text: string
    id?: string
}

type Props = {
    isActive: boolean
    className?: string
    headingClassName?: string
    textClassName?: string
} & ParagraphType

const Paragraph: React.FC<Props> = ({ isActive, heading, text, className, headingClassName, textClassName, id }) => {
    let hash = id || heading;

    return <div className={cn('flex flex-col gap-y-2.5', className)} id={hash}>
        <Link className={cn('w-fit transition-colors text-white hover:text-white/80', isActive && 'underline')} to={`#${hash}`}>
            <h3 className={cn('', headingClassName)}>{heading}</h3>
        </Link>
        <p className={cn('', textClassName)}>{text}</p>
    </div>
};

export default Paragraph;