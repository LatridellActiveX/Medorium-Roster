import { RefObject, useEffect, useMemo } from "react";
import Category, { BurgerMenuCategoryType } from "./category";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const categories: BurgerMenuCategoryType[] = [
  {
    group: "unauth",
    pages: [
      { name: "Home", route: "/" },
      { name: "Faq", route: "/faq" },
      { name: "Privacy Policy", route: "/privacyPolicy" }
    ]
  },
  {
    group: "auth",
    pages: [
      { name: "Roster", route: "/roster" },
    ]
  },
  {
    group: "admin",
    pages: [
      { name: "Admin Panel", route: "/adminPanel" }
    ]
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
        (c.group === "auth" && typeof currentUser.username !== "string") ||
        (c.group === "admin" && currentUser.isAdmin !== true)
      ) {
        return false;
      }

      return true;
    });

    return availableCategories.map((p) => (
      <Category {...p} onItemClick={handleOpenStatus} key={p.group} />
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

  return <div className="grid gap-y-2.5 text-lg">{Categories}</div>;
};

export default Categories;
