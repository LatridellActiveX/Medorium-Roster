import React, {useState, useEffect} from 'react';
import Myform from './LoginForm.js';
import Heading from './Lheading.js'
import Footer from './Footer.js';
import Rform from './Rform.js';
import AdminPanel from './Apanel.js';

const App = () => {
    //registration form re-render state Variable
    const [isRegForm, setisRegForm] = useState(false);

    //isLoading State Variable
    const [isLoading, setIsLoading] = useState(true);

    const [isAdmin, setIsAdmin] = useState(false);

    //timeout function for page loading
    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false);
        }, 2000);
    });

    const adminMode= (mode) =>{
        setIsAdmin(mode);
        window.alert("Admin Mode Authorized");
    }

/**
 * 
 * 
 * 
 * 
 * 
 * 
 */



    //var regForm = false;
    const onData = (data) =>{
        setisRegForm(data);
        console.log("values passed to parent:", data);
    }
    //{isRegForm ? <Rform/> : <Myform onRegToggle={onData}/>}
    if(isLoading){
        return(<h1>Page is Loading...</h1>);
    }else{
        return(
            <div className="app">
                <Heading/>
                <div id="formArea">
                { isRegForm ? ( <Rform/> 
                    ) : (
                        isAdmin ? ( <AdminPanel/> 
                    ) : (
                        <Myform onRegToggle={onData} adminToggle={adminMode}/>
                    ))}
                </div>
                <Footer/>
            </div>
        );
    }


};

export default App;