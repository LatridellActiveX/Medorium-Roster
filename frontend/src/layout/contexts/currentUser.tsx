import { ReactNode, createContext, useState } from "react";

/**LATRIDELL - A context is a feature in react that allows
 * you to share data between components without having to pass
 * props. 
 */



export type CurrentUserType = {
  username: string | null | false;
  isAdmin?: boolean;
};


export const currentUserContext = createContext({
  currentUser: {
    username: null,
    isAdmin: false,
  } as CurrentUserType,
  setCurrentUser: (_user: CurrentUserType) => {},
});

//LATRIDELL - allows us to pass children into a component
type Props = {
  children: ReactNode;
};

//LATRIDELL -  Allows us to have a global username and isAdmin state
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
