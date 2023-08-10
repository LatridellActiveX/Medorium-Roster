import { ReactNode } from "react";
import CurrentUserContext from "./currentUser";

type Props = {
  children: ReactNode
}

const Contexts: React.FC<Props> = ({ children }) => {
  
  return <CurrentUserContext>
    {children}
  </CurrentUserContext>
};

export default Contexts;