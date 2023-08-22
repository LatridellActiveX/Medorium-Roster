import { Link } from "react-router-dom";
import cn from "classnames";
import deleteCookie from "../../helpers/deleteCookie";
import useCurrentUser from "../../hooks/useCurrentUser";

type Props = {
  handleOpenStatus: () => void;
};

const LoginOrLogout: React.FC<Props> = ({ handleOpenStatus }) => {
  let { currentUser, setCurrentUser } = useCurrentUser();
  const isAuth = !!currentUser.username;

  function logout() {
    deleteCookie("authToken2");
    setCurrentUser({
      username: false,
    });
  }

  const handleClick = () => {
    handleOpenStatus();

    if (!isAuth) return;

    logout();
  };

  return (
    <>
      <Link
        to={isAuth ? "/" : "/login"}
        onClick={handleClick}
        className={cn(
          "rounded-md text-black font-bold px-3 text-lg h-fit py-0.5 transition-opacity hover:text-black",
          isAuth ? "bg-red-400 hover:bg-red-400/70" : "bg-blue-400 hover:bg-blue-400/70"
        )}
      >
        {isAuth ? "Log out" : "Log in"}
      </Link>
    </>
  );
};

export default LoginOrLogout;
