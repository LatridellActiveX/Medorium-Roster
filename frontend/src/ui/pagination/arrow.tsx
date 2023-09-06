import { FC } from 'react';
import cn from 'classnames';
import ChevronDown from '../../icons/chevronDown';

type Props = {
  className: string
}

const Arrow: FC<Props> = ({ className }) => {
  return <div className={cn('flex h-[40px] w-[40px] border transition-opacity hover:opacity-60', className)}>
    <ChevronDown className='m-auto' />
  </div>
};

export default Arrow;