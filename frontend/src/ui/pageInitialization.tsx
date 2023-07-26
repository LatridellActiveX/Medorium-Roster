import { ReactNode, useState, useEffect } from 'react';

type Props = {
    children: ReactNode
    pathIfAuth?: string
    pathIfUnauth?: string
}

const PageInitialization: React.FC<Props> = ({ children, pathIfAuth, pathIfUnauth }) => {
    const [isLoading, setIsLoading] = useState(true);

    /*Page loading timeout
        contains a function called token that sets a timout event listener for 2 seconds, after which the loading state variable is set to false
        returns a cleanup of the timout function. The question is in what situation is the timout function called, and how does clearTimout work?
    */
    useEffect(() => {
        //executes the Timeout and returns the Timer ID/token for clean up when component is unmounted. 
        let timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    //how is isLoading separated from the normal login form it returns?
    if (isLoading) {
        return <h1>Page is Loading...</h1>
    };

    return children
};

export default PageInitialization;