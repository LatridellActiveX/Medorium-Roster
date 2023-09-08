import { useContext } from "react";
import { currentUserContext } from "../layout/contexts/currentUser";

/** Make use of the currentUserContext
 * @returns useContext(currentUserContext)
 */
const useCurrentUser = () => {
  return useContext(currentUserContext);
};

export default useCurrentUser;
