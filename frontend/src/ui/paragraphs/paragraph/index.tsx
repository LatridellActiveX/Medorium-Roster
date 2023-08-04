import cn from 'classnames';
import { Link } from 'react-router-dom';
import Text from './text';
import { ParagraphEffectedTextType } from './text/effectedItem';

export type ParagraphTextType = ParagraphEffectedTextType | string

export type ParagraphType = {
    heading: string
    texts: string | (string | ParagraphTextType[])[]
    id?: string
}

//Intersection type between Props and ParagraphType
type Props = {
    isActive: boolean
    className?: string
    headingClassName?: string
    textsContainerClassName?: string
    textClassName?: string
} & ParagraphType

const Paragraph: React.FC<Props> = ({ isActive, heading, texts, className, headingClassName, textsContainerClassName, textClassName, id }) => {
    let hash = id || heading.replaceAll(' ', '-');

    let textInArray = Array.isArray(texts) ? texts : [texts];
    let Texts = textInArray.map((t, index) => <Text className={textClassName} texts={t} key={index} />);

    return <div className={cn('flex flex-col', className)} id={hash}>
        <Link
            className={cn(
                'w-fit transition-colors text-white hover:text-white/80',
                isActive && 'underline'
            )}
            to={`#${hash}`}
        >
            <h3 className={cn('', headingClassName)}>{heading}</h3>
        </Link>
        <div className={cn('flex flex-col', textsContainerClassName)}>
            {Texts}
        </div>
    </div>
};

export default Paragraph;