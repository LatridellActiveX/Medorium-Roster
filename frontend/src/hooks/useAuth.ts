import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { authorizeUser } from "../redux/reducers/authReducer";

const useAuth = () => {
    const [cookies] = useCookies(['jwt']);

    const jwtToken = cookies.jwt as string | undefined; //need to add

    useEffect(() => {
        if (!jwtToken) return;

        axios.get(`http://localhost:3000/auth?token=${jwtToken}`).then(resp => {
            if (resp.status === 200) {
                authorizeUser(resp.data.userId)
            }
        })
    }, [jwtToken]);
};

export default useAuth;