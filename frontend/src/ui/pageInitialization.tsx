import { ReactNode, useState, useEffect } from "react";
import cn from "classnames";
import useAuthRedirect from "../hooks/useAuthRedirect";

type Props = {
  children: ReactNode;
  className?: string;
  pathIfAuth?: string | null;
  pathIfUnauth?: string;
  redirectIfNotAdmin?: boolean;
};

const PageInitialization: React.FC<Props> = ({
  children,
  className,
  pathIfAuth = null,
  pathIfUnauth,
  redirectIfNotAdmin,
}) => {
  useAuthRedirect(pathIfAuth, pathIfUnauth, redirectIfNotAdmin);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 50);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (isLoading) {
    return (
      <main className={cn(className)}>
        <h1>Page is Loading...</h1>
      </main>
    );
  }

  return children;
};

export default PageInitialization;
