import React, {useState} from 'react';
import axios from 'axios';


//form component
const MyForm = ({ onRegToggle, adminToggle} ) => {
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
        const response = await axios.post('http://localhost:3000/api/login', formData);
        console.log('Server response: ', response.data);
        if(response.data == "1400"){
            adminToggle(true);
        }
    }catch(error){
        console.error('Error communicating with server: ', error);
    }

    setFormData({username: '', password: ''});
    };

   //View of the component
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
          <p>First Time?</p>
          <button onClick={toggleForm}>Register</button>

     </form>

    );
};

export default MyForm;