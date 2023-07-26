import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUsername } from "../redux/selectors";
import { useNavigate } from "react-router";

const useAuthRedirect = (pathIfAuth: string | null, pathIfUnauth?: string) => {
    const navigate = useNavigate();
    let isAuthorized = useSelector(selectUsername);

    // useEffect(() => {
    //     if (pathIfAuth && isAuthorized) {
    //         navigate(pathIfAuth);
    //     } else if (pathIfUnauth && !isAuthorized) {
    //         navigate(pathIfUnauth);
    //     }
    // }, [isAuthorized]);
};

export default useAuthRedirect;