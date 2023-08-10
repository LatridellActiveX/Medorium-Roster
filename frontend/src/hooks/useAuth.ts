import { useEffect } from "react";
import axios from "../api/axios";
import useCurrentUser from "./useCurrentUser";

const useAuth = () => {
  const { setCurrentUser } = useCurrentUser();

  useEffect(() => {
    axios
      .get("auth")
      .then((resp) => {
        if (resp.status === 200) {
          setCurrentUser({
            username: resp.data.username,
            isAdmin: resp.data?.admin
          })
        }
      })
      .catch((_) => {
        setCurrentUser({
          username: false,
        });
      });
  }, []);
};

export default useAuth;
