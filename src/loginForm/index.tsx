import React from 'react';
import axios from 'axios';
//what is formik?
import { useFormik } from 'formik';
//what is yup?
import * as Yup from 'yup';

//need to go over typescript types
type Props = {
    onRegToggle: (response: boolean) => void
    adminToggle: (response: boolean) => void
}

const LoginForm: React.FC<Props> = ({ adminToggle, onRegToggle }) => {
    //Dont know what formik is
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        //what is a validation schema?
        validationSchema: Yup.object({
            username: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            password: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            console.log('Form submitted on client side:', values);
            console.log("Attempting to send form data to server.");

            try {
                let response = await axios.post('http://localhost:3000/api/login', values);
                console.log('Server response: ', response.data);

                if (response.data == "1400") {
                    adminToggle(true);
                };

                resetForm();
            } catch (error) {
                console.error('Error communicating with server: ', error);
            };
        },
    });

    const handleRegBtn = () => {
        onRegToggle(true);
    };

    return <form id="Lform" onSubmit={formik.handleSubmit}>
        <table>
            <tr>
                <td><label id="Uname">Username</label></td>
                <td><input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} /></td>
            </tr>
            <tr>
                <td><label id="Pword">Password</label></td>
                <td><input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} /></td>
            </tr>
        </table>
        <button type="submit">Submit</button>
        <p>First Time?</p>
        <button onClick={handleRegBtn}>Register</button>
    </form>
};

export default LoginForm;