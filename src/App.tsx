import React, { useState, useEffect } from 'react';
import Loginform from './loginForm/index';
import Heading from './heading/index';
import Footer from './footer/index';
import AdminPanel from './APanel/index';
import RegForm from './regForm/index';

const App: React.FC = () => {
    const [isRegForm, setisRegForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    //timeout function for page loading
    useEffect(() => {
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

    const onData = (response: boolean) => {
        setisRegForm(response);
        console.log("values passed to parent:", response);
    };

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