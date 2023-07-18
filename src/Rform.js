import React, {useState} from 'react';
import axios from 'axios';

//registration form component, 
//make sure its css lines up with the login form as well. 
const Rform = () =>{

//what kind of data will it need, a username, password, and registration code. 

//this is the useState variable that will re-render the component when called. 
const [formData, setFormData] = useState({
    username: '',
    password: '',
    regcode: ''
});

/*we need to have an endpoint it sends the information to but 
first we need to create its look and make sure it appears on the
page correctly using a table and css. 
*/

const handleSubmit = (event) =>{
    //prevents page refresh
    event.preventDefault();
    console.log("Registration submitted locally");

    //try catch loop here, blah blah

    //setFormData here as well to re-render the component. 
}

const handleChange = (event) =>{
    setFormData({...formData, [event.target.name]: event.target.value});
}

//we need a handleSubmit function

return(
    <h1>Test Registration Form</h1>,
    <form id="Rform" onSubmit={handleSubmit}>
        <table>
            <tr>
                <td><label id="RuName">Username:</label></td>
                <td><input type="text" name="username" value={formData.username} onChange={handleChange} required></input></td>
            </tr>
            <tr>
                <td><label id="Rpass">Password:</label></td>
                <td><td><input type="password" name="username" value={formData.password} onChange={handleChange} required></input></td></td>
            </tr>
            <tr>
                <td><label id="regCode">Registration Code:</label></td>
                <td><td><input type="text" name="regCode" value={formData.regcode} onChange={handleChange} required></input></td></td>
            </tr>
        </table>
        <botton type="submit">Register</botton>
    </form>
);
}