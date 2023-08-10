import { useContext } from "react";
import { currentUserContext } from "../layout/contexts/currentUser";

const useCurrentUser = () => {
  return useContext(currentUserContext);
};

export default useCurrentUser;
