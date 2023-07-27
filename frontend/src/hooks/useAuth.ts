import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { authorizeUser } from "../redux/reducers/authReducer";
import { useDispatch } from "react-redux";

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3000/auth", { withCredentials: true })
        .then((resp) => {
          if (resp.status === 200) {
            dispatch(authorizeUser(resp.data.username));
          }
        });
    } catch (e) {
      let err = e as AxiosError;
      console.error(err.message)
    }
  }, []);
};

export default useAuth;
