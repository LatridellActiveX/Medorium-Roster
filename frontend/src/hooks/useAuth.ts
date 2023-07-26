import axios from "axios";
import { useEffect } from "react";
import { authorizeUser } from "../redux/reducers/authReducer";
import { useDispatch } from 'react-redux';

const useAuth = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('http://localhost:3000/auth', { withCredentials: true }).then(resp => {
            if (resp.status === 200) {
                dispatch(authorizeUser(resp.data.username));
            } else {
                dispatch(authorizeUser(null));
            }
        })
    }, []);
};

export default useAuth;