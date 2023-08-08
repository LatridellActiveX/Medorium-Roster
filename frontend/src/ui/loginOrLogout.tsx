import { useDispatch, useSelector } from "react-redux";
import { authorizeUser } from "../redux/reducers/authReducer";
import { selectUsername } from "../redux/selectors";
import { Link } from "react-router-dom";
import cn from "classnames";
import deleteCookie from "../helpers/deleteCookie";

const LoginOrLogout: React.FC = () => {
  const isAuth = useSelector(selectUsername);
  const dispatch = useDispatch();
  function logout() {
    deleteCookie("authToken2");
    dispatch(authorizeUser(false));
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
