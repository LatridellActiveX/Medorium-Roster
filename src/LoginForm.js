import React, {useState} from 'react';



//form component
const MyForm = () => {
    //state variable that triggers component render/handles state and variables related to form
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

//function that handles when data in the form is changed
const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
};

//function that handles when the form is submitted
const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);

    setFormData({username: '', passwork: ''});
};

    //Html of the component
    return(
        <form id="Lform" onSubmit={handleSubmit}>
            <table>
                <tr>
                    <td><label id="Uname">Username</label></td>
                    <td><input type="text" name="username" value={ formData.username } onChange={handleChange} required/></td>
                </tr>
                <tr>
                    <td><label id="Pword">Password</label></td>
                    <td><input type="password" name="password" value={ formData.password } onChange={handleChange} required/></td>
                </tr>
            </table>
          <button type="submit">Submit</button>
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