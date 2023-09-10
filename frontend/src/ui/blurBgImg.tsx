import cn from "classnames";

type Props = {} & React.ImgHTMLAttributes<HTMLImageElement>;

const BlurBgImg: React.FC<Props> = ({ className, ...props }) => {
  return <img className={cn("fixed top-0 left-0 w-full h-full blur-sm bg-center bg-no-repeat bg-cover", className)} {...props} />;
};

export default BlurBgImg;
