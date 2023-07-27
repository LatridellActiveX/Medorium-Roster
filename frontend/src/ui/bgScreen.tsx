import cn from 'classnames';

type Props = {
    className?: string
}

const BgScreen: React.FC<Props> = ({ className }) => {
    return <div
        className={cn(
            'bg-screen leftContainer absolute top-0 h-full w-screen -z-10',
            className
        )}
    />
};

export default BgScreen;