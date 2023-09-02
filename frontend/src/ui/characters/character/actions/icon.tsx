import { ReactNode } from "react";
import Tooltip from "../../../tooltip";

type Props = {
  action: 'Edit' | 'Delete'
  name: string
  children: ReactNode //icon
  onClick: () => void
};

const Icon: React.FC<Props> = ({ action, name, children, onClick }) => {
  return (
    <Tooltip text={`${action} the character`}>
      <button
        className="transition-opacity hover:opacity-70"
        aria-label={`${action} ${name} character`}
        onClick={onClick}
      >
        {children}
      </button>
    </Tooltip>
  );
};

export default Icon;
