import { ReactNode } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

type Props = {
  children: ReactNode;
  className?: string;
};

const CharacterWrapper: React.FC<Props> = ({ children, className }) => {
  return (
    <Link
      className={cn("transition-opacity hover:opacity-70", className)}
      to="/dashboard"
      aria-label="Go to dashboard"
    >
      {children}
    </Link>
  );
};

export default CharacterWrapper;
