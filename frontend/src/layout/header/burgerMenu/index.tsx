import { RefObject, useRef } from "react";
import cn from "classnames";
import Categories from "./categories";
import UserInfo from "./userInfo";

type Props = {
  isOpen: boolean;
  handleOpenStatus: () => void;
  burgerIconRef: RefObject<HTMLButtonElement>;
};

const BurgerMenu: React.FC<Props> = ({
  isOpen,
  handleOpenStatus,
  burgerIconRef,
}) => {
  const burgerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "absolute top-12 right-0 z-20 border border-white min-w-[290px] bg-c-primary p-3",
        !isOpen && "hidden"
      )}
      ref={burgerRef}
    >
      <Categories
        isOpen={isOpen}
        burgerRef={burgerRef}
        burgerIconRef={burgerIconRef}
        handleOpenStatus={handleOpenStatus}
      />
      <UserInfo handleOpenStatus={handleOpenStatus} />
    </div>
  );
};

export default BurgerMenu;
