import { useEffect } from "react";
import { useNavigate } from "react-router";
import useCurrentUser from "./useCurrentUser";

/**Navigates users based on Authorization
 * @Param string | null - pathIfUnauth - path if UnAuthorized
 * @Param string | null - pathIfAuth - path if Authorized
 * @params bool - redirectIfNotAdmin - Restrict path to admins only
 */
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
