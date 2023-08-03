import { ReactNode } from 'react';
import cn from 'classnames';
import CloseIcon from '../icons/close';

type Props = {
    title: string
    children: ReactNode
    isOpen: boolean
    onClose: () => void
    className?: string
}

const ModalBase: React.FC<Props> = ({ title, children, isOpen, onClose, className }) => {

    return <div className="relative z-10" aria-labelledby={title} role="dialog" aria-modal="true">
        <div className={cn("flex justify-center items-center w-full h-full fixed top-0 left-0 z-50 transition-all", !isOpen && 'opacity-0 invisible')}>
            <div className='absolute w-screen h-screen left-0 top-0 bg-[#181818]/70' style={{ backdropFilter: 'blur(4.5px)' }} onClick={onClose} />
            <div className={cn("relative rounded-xl", className)}>
                <CloseIcon className="absolute right-3 top-3 z-10 cursor-pointer transition-opacity hover:opacity-80" onClick={onClose} />
                {children}
            </div>
        </div>
    </div>
};

export default ModalBase;