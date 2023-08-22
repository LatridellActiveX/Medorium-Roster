import { Link } from "react-router-dom";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import LoginOrLogout from "../../loginOrLogout";

type Props = {
  handleOpenStatus: () => void;
};

const UserInfo: React.FC<Props> = ({ handleOpenStatus }) => {
  const { currentUser } = useCurrentUser();
  const isAuth = !!currentUser.username;

  return (
    <div className="grid grid-cols-[1fr_max-content] gap-x-5 items-center mt-8 text-lg">
      <div className="">
        <p>
          {isAuth ? (
            <>
              <span>Signed in as </span>
              <span className="font-bold block truncate max-w-[165px]">{currentUser.username}</span>
            </>
          ) : (
            "You are not signed in"
          )}
        </p>
        {isAuth ? null : (
          <Link to="registration" className="text-sm font-bold">
            Don't have an account?
          </Link>
        )}
      </div>
      <LoginOrLogout handleOpenStatus={handleOpenStatus} />
    </div>
  );
};

export default UserInfo;
