import React, { useState, useEffect } from 'react';
import Loginform from './loginForm/index';
import Heading from './heading/index';
import Footer from './footer/index';
import AdminPanel from './APanel/index';
import RegForm from './regForm/index';


/*
React.FC (.FC) is the typescript Type for Functional Components
*
* 
*
*/
const App: React.FC = () => {
    const [isRegForm, setisRegForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    /*Page loading timeout
        contains a function called token that sets a timout event listener for 2 seconds, after which the loading state variable is set to false
        returns a cleanup of the timout function. The question is in what situation is the timout function called, and how does clearTimout work?
    */
    useEffect(() => {
        //executes the Timeout and returns the Timer ID/token for clean up when component is unmounted. 
        let token = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => {
            clearTimeout(token);
        };
    }, [isRegForm, isAdmin]);

    const adminMode = (isMode: boolean) => {
        setIsAdmin(isMode);
        window.alert("Admin Mode Authorized");
    };

    //the response boolean parameter is correlated with the login form prop
    const onData = (response: boolean) => {
        setisRegForm(response);
        console.log("values passed to parent:", response);
    };


    //how is isLoading separated from the normal login form it returns?
    if (isLoading) {
        return <h1>Page is Loading...</h1>
    };

    return <div className="app">
        <Heading />
        <div id="formArea">
            {isRegForm
                ? <RegForm />
                : isAdmin
                    ? <AdminPanel />
                    : <Loginform onRegToggle={onData} adminToggle={adminMode} />
            }
        </div>
        <Footer />
    </div>
};

export default App;