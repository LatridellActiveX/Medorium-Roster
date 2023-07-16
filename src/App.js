import React from 'react';
import Myform from './LoginForm.js';
import Heading from './Lheading.js'
import Footer from './Footer.js';

const App = () => {
    return(
        <div className="app">
            <Heading/>
            <Myform/>
            <Footer/>
        </div>
    );
};

export default App;