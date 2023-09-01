import { useEffect } from "react";
import { useNavigate } from "react-router";
import useCurrentUser from "./useCurrentUser";

const useAuthRedirect = (
  pathIfAuth: string | null,
  pathIfUnauth?: string,
  redirectIfNotAdmin?: boolean
) => {
  const navigate = useNavigate();
  let { currentUser } = useCurrentUser();
  let isAuthorized = currentUser.username;

  useEffect(() => {
    if (isAuthorized === null) return;

    if (redirectIfNotAdmin && currentUser.isAdmin === false) {
      navigate("/notFound");
    }

    if (pathIfAuth && isAuthorized) {
      navigate(pathIfAuth);
      return;
    }
    if (pathIfUnauth && !isAuthorized) {
      navigate(pathIfUnauth);
      return;
    }
  }, [isAuthorized]);
};

export default useAuthRedirect;
