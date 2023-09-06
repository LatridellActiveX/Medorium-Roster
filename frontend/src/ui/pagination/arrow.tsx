import { FC } from 'react';
import cn from 'classnames';
import ChevronDown from '../../icons/chevronDown';

type Props = {
  className: string
}

const Arrow: FC<Props> = ({ className }) => {
  return <div className={cn('flex h-[40px] w-[40px] border border-grey4 transition-colors hover:border-grey1', className)}>
    <ChevronDown className='m-auto' />
  </div>
};

export default Arrow;