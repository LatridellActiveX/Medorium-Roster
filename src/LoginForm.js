import React, {useState} from 'react';
import axios from 'axios';


//form component
const MyForm = ({ onRegToggle} ) => {
    //state variable that triggers component render/handles state and variables related to form
    var regToggle = false;
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const toggleForm = () =>{
        regToggle = !regToggle;
        console.log("New RegToggle Value: ", regToggle);
        onRegToggle(regToggle);

    }
//function that handles when data in the form is changed
const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
};

//function that handles when the form is submitted
const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted on client side:', formData);
    console.log("Attempting to send form data to server.");
    try{
        const response = await axios.post('http://localhost:3000/api/test', formData);
        console.log('Server response: ', response.data);
    }catch(error){
        console.error('Error communicating with server: ', error);
    }

    setFormData({username: '', password: ''});
};




    //Html of the component
    return(
        <form id="Lform" onSubmit={handleSubmit}>
            <table>
                <tr>
                    <td><label id="Uname">Username</label></td>
                    <td><input type="text" name="username" value={ formData.username } onChange={handleChange}/></td>
                </tr>
                <tr>
                    <td><label id="Pword">Password</label></td>
                    <td><input type="password" name="password" value={ formData.password } onChange={handleChange}/></td>
                </tr>
            </table>
          <button type="submit">Submit</button>
          <p>Not a member?</p>
          <button onClick={toggleForm}>Register</button>

     </form>

    );
};
const LoginForm = () => {
    return(
        <div className="login-form">
            <h1>The form will go here</h1>
        </div>
    );
};




export default MyForm;