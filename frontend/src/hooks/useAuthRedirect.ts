import { useEffect } from "react";
import { useNavigate } from "react-router";
import useCurrentUser from "./useCurrentUser";

const useAuthRedirect = (pathIfAuth: string | null, pathIfUnauth?: string) => {
  const navigate = useNavigate();
  let { currentUser } = useCurrentUser();
  let isAuthorized = currentUser.username;

  useEffect(() => {
    if (isAuthorized === null) return;

    if (pathIfAuth && isAuthorized) {
      navigate(pathIfAuth);
    } else if (pathIfUnauth && !isAuthorized) {
      navigate(pathIfUnauth);
    }
  }, [isAuthorized]);
};

export default useAuthRedirect;
