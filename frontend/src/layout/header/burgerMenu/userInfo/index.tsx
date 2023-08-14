import useCurrentUser from "../../../../hooks/useCurrentUser";
import LoginOrLogout from "./loginOrLogout";

type Props = {
  handleOpenStatus: () => void;
};

const UserInfo: React.FC<Props> = ({ handleOpenStatus }) => {
  const { currentUser } = useCurrentUser();

  return (
    <div className="grid grid-cols-[1fr_max-content] gap-x-5 items-center mt-10">
      <p>
        {currentUser.username ? (
          <>
            <span>Signed in as </span>
            <span className="font-bold">{currentUser.username}</span>
          </>
        ) : (
          "You are not signed in"
        )}
      </p>
      <LoginOrLogout handleOpenStatus={handleOpenStatus} />
    </div>
  );
};

export default UserInfo;
