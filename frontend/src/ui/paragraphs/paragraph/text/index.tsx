import cn from 'classnames';
import { ParagraphTextType } from '..';
import EffectedText from './effectedItem';

type Props = {
    texts: string | ParagraphTextType[]
    className?: string
}

const Text: React.FC<Props> = ({ className, texts }) => {

    let Texts = typeof texts === 'string'
        ? texts
        : texts.map((t, index) => typeof t === 'string' ? t : <EffectedText text={t} key={index} />);

    return <p className={cn('', className)}>
        {Texts}
    </p>
};

export default Text;