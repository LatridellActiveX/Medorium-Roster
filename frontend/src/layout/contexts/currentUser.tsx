import { ReactNode, createContext, useState } from "react";

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

type Props = {
  children: ReactNode;
};

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
