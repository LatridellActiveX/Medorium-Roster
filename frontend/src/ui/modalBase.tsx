import { ReactNode, useEffect } from "react";
import cn from "classnames";
import CloseIcon from "../icons/close";
import { useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
  query: string; //e.g. localhost/?create=true. query is "create"
  onClose: () => void;
  className?: string;
};

const ModalBase: React.FC<Props> = ({
  children,
  query,
  onClose,
  className,
}) => {
  const location = useLocation();

  let isOpen = location.search.includes(query);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !isOpen) return;

      onClose();
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [isOpen]);

  return (
    <div
      className="relative z-10"
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <div
        className={cn(
          "flex justify-center items-center w-full h-full fixed top-0 left-0 z-50 transition-all",
          !isOpen && "opacity-0 invisible"
        )}
      >
        <div
          className="absolute w-screen h-screen left-0 top-0 bg-[#181818]/70"
          style={{ backdropFilter: "blur(4.5px)" }}
          onClick={onClose}
        />
        <div className={cn("relative rounded-xl", className)}>
          <button
            className="absolute right-2 top-2 z-10 cursor-pointer transition-opacity sm:right-3 sm:top-3 hover:opacity-80"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalBase;
