import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUsername } from "../redux/selectors";
import { useNavigate } from "react-router";

const useAuthRedirect = (
    pathIfAuth: string | null,
    pathIfUnauth?: string,
    isCallback?: boolean
) => {
    const navigate = useNavigate();
    let isAuthorized = useSelector(selectUsername);

    useEffect(() => {
        if (isAuthorized === null || isCallback) return;

        if (pathIfAuth && isAuthorized) {
            navigate(pathIfAuth);
        } else if (pathIfUnauth && !isAuthorized) {
            navigate(pathIfUnauth);
        }
    }, [isAuthorized]);
};

export default useAuthRedirect;