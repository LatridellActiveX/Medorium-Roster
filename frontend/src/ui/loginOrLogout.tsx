import { Link } from "react-router-dom";
import cn from "classnames";
import deleteCookie from "../helpers/deleteCookie";
import useCurrentUser from "../hooks/useCurrentUser";

const LoginOrLogout: React.FC = () => {
  let { currentUser, setCurrentUser } = useCurrentUser();
  const isAuth = !!currentUser.username;
  function logout() {
    deleteCookie("authToken2");
    setCurrentUser({
      username: false
    });
  }

  return (
    <Link
      to={isAuth ? "/" : "/login"}
      onClick={isAuth ? logout : undefined}
      className={cn(
        "btn bg- rounded-md text-black px-3 py-[1px] text-lg hover:text-black",
        isAuth ? "bg-red-400" : "bg-blue-400"
      )}
    >
      {isAuth ? "Log out" : "Log in"}
    </Link>
  );
};

export default LoginOrLogout;
