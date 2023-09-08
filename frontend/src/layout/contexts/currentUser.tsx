import { ReactNode, createContext, useState } from "react";

/**LATRIDELL - A context is a feature in react that allows
 * you to share data between components without having to pass
 * props through the chain. 
 */



export type CurrentUserType = {
  username: string | null | false;
  isAdmin?: boolean;
};

/**What purpose does this serve?
 * 
 */
export const currentUserContext = createContext({
  currentUser: {
    username: null,
    isAdmin: false,
  } as CurrentUserType,
  setCurrentUser: (_user: CurrentUserType) => {},
});

//LATRIDELL - defines param type for component below
type Props = {
  children: ReactNode;
};

/** Allows us to have a global username and isAdmin state
 * 
 * @GlobalVars a [username] and a [isAdmin] state
 * @param children elements 
 * @returns children with global state access 
 */
const CurrentUserContext: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType>({
    username: null,
    isAdmin: false,
  });

  return (
    <currentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </currentUserContext.Provider>
  );
};

export default CurrentUserContext;
