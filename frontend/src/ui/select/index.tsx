import cn from 'classnames';
import Option from './option';

type Props = {
    data: string[]
    name: string
    onChange: (e: React.ChangeEvent<any>) => void
    label?: string
    className?: string
}

const Select: React.FC<Props> = ({ data, className, name, label = name, onChange }) => {

    return <div>
        <label className='capitalize'>{label}</label>
        <select className={cn('w-full rounded-md text-black capitalize p-2', className)} name={name} onChange={onChange}>
            {data.map((d, index) => <Option text={d} key={index} />)}
        </select>
    </div>
};

export default Select;