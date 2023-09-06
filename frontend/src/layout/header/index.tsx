import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import BurgerMenu from "./burgerMenu";
import cn from "classnames";
import useCurrentUser from "../../hooks/useCurrentUser";
import LoginOrLogout from "./loginOrLogout";

const Header: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const isAuth = !!currentUser.username;
  const burgerIconRef = useRef<HTMLButtonElement>(null);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const handleBurgerStatus = () => {
    setIsBurgerOpen((prev) => !prev);
  };

  return (
    <header className="w-full fixed text-2xl z-20 px-4">
      <div className="h-16 sm:w-[32rem] md:w-[42rem] mx-auto flex justify-between items-center">
        <div className="">
          <div className="flex items-center cursor-pointer">
            <Link to="/" className="text-slate-200">
              MP Collective
            </Link>
          </div>
        </div>
        <div className="relative flex gap-4">
          {isAuth ? null : (
            <LoginOrLogout handleOpenStatus={handleBurgerStatus} />
          )}
          <button
            className={cn(
              "space-y-2 transition-opacity hover:opacity-70",
              isBurgerOpen && "opacity-70"
            )}
            aria-label='Open navigation menu'
            onClick={handleBurgerStatus}
            ref={burgerIconRef}
          >
            <span className="block w-5 h-[3px] rounded-sm bg-slate-100"></span>
            <span className="block w-8 h-[3px] rounded-sm bg-slate-100"></span>
            <span className="block w-8 h-[3px] rounded-sm bg-slate-100"></span>
          </button>

          <BurgerMenu
            isOpen={isBurgerOpen}
            handleOpenStatus={handleBurgerStatus}
            burgerIconRef={burgerIconRef}
          />
        </div>
      </div>
      <Link className="transition-opacity hover:opacity-70" to="/">
        {/* <img id="Logo" src={logo} alt="Logo" className='h-24' /> */}
      </Link>
    </header>
  );
};

export default Header;
