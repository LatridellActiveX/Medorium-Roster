import { RefObject, useEffect, useMemo } from "react";
import Category, { BurgerMenuCategoryType } from "./category";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const categories: BurgerMenuCategoryType[] = [
  {
    category: "unauth",
    pages: ["FAQ", "privacy policy"],
  },
  {
    category: "auth",
    pages: ["roster", "dashboard"],
  },
  {
    category: "admin",
    pages: ["admin panel"],
  },
];

type Props = {
  isOpen: boolean;
  burgerRef: RefObject<HTMLDivElement>;
  burgerIconRef: RefObject<HTMLButtonElement>;
  handleOpenStatus: () => void;
};

const Categories: React.FC<Props> = ({
  isOpen,
  burgerRef,
  burgerIconRef,
  handleOpenStatus,
}) => {
  const { currentUser } = useCurrentUser();

  let Categories = useMemo(() => {
    let availableCategories = categories.filter((c) => {
      if (
        (c.category === "auth" && typeof currentUser.username !== "string") ||
        (c.category === "admin" && currentUser.isAdmin !== true)
      ) {
        return false;
      }

      return true;
    });

    return availableCategories.map((p) => (
      <Category {...p} onItemClick={handleOpenStatus} key={p.category} />
    ));
  }, [currentUser]);

  useEffect(() => {
    const callback = (e: MouseEvent) => {
      let target = burgerRef.current;
      let burgerIcon = burgerIconRef.current;

      if (!target || !isOpen || !burgerIcon) return;

      let withinBoundaries = e.composedPath().includes(target);
      let isBurgerIcon = e.composedPath().includes(burgerIcon);

      if (!withinBoundaries && !isBurgerIcon) {
        handleOpenStatus();
      }
    };

    document.addEventListener("click", callback);

    return () => {
      document.removeEventListener("click", callback);
    };
  }, [burgerRef, burgerIconRef, isOpen]);

  return <div className="grid gap-y-2.5">{Categories}</div>;
};

export default Categories;
