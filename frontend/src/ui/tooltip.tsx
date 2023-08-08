import { ReactNode } from "react";
import cn from 'classnames';

type Props = {
    children: ReactNode
    text: string
    shouldHide?: boolean
    className?: string
    containerClassName?: string
}

const Tooltip: React.FC<Props> = ({ children, text, shouldHide, className, containerClassName }) => {

    return <div className={cn("relative group/tooltip", containerClassName)}>
        {children}
        <div
            className={cn(
                "absolute -top-14 left-1/2 -translate-x-1/2 bg-c-primary p-2.5 rounded-lg text-white invisible transition-all z-20 whitespace-nowrap group-hover/tooltip:visible",
                shouldHide && 'hidden',
                className,
            )}
            role="tooltip"
        >
            {text}
        </div>
    </div>
};

export default Tooltip;