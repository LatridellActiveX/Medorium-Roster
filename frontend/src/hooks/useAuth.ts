import { useEffect } from "react";
import axios from "../api/axios";
import useCurrentUser from "./useCurrentUser";
import type { ResponseIsAuthorized } from "api/types";

const useAuth = () => {
  const { setCurrentUser } = useCurrentUser();

  useEffect(() => {
    axios
      .get<ResponseIsAuthorized>("auth")
      .then((resp) => {
        if (resp.status === 200) {
          setCurrentUser({
            username: resp.data.username,
            isAdmin: resp.data.isAdmin,
          });
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
