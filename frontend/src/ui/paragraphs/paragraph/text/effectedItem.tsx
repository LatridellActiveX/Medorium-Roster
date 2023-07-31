import cn from 'classnames';

export type ParagraphEffectedTextType = {
    text: string
    effect?: 'bold' | 'link' | 'email'
    shouldAddSpace?: boolean
}

type Props = {
    text: ParagraphEffectedTextType
}

const EffectedText: React.FC<Props> = ({ text: { text, effect = 'bold', shouldAddSpace = true } }) => {

    return <span
        className={cn(
            '',
            effect === 'bold' && 'font-bold',
        )}
    >
        {' '}
        {effect === 'link'
            ? <a href={text} target='_blank' rel='noreferrer noopener'>{text}</a>
            : effect === 'email'
                ? <a href={`mailto:${text}`}>{text}</a>
                : text
        }
        {shouldAddSpace && ' '}
    </span>
};

export default EffectedText;