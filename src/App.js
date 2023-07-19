import React, {useState} from 'react';
import Myform from './LoginForm.js';
import Heading from './Lheading.js'
import Footer from './Footer.js';
import Rform from './Rform.js';

const App = () => {
    const [isRegForm, setisRegForm] = useState(false);
    //var regForm = false;
    const onData = (data) =>{
        setisRegForm(data);
        console.log("values passed to parent:", data);
    }

    return(
        <div className="app">
            <Heading/>
            <div id="formArea">
            {isRegForm ? <Rform/> : <Myform onRegToggle={onData}/>}
            </div>
            <Footer/>
        </div>
    );
};

export default App;