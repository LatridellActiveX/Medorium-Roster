import React from 'react';
import axios from 'axios';
//what is formik?
import { useFormik } from 'formik';
//Yup is for schema validation
import * as Yup from 'yup';

/** Type description
 * This is a Type definition for a custom type in Typescript.  
 * 
 * Props is the Type alias
 * onRegToggle and adminToggle are set as functions that have a parameter for a response that is a boolean. 
 */
type Props = {
    onRegToggle: (response: boolean) => void
    adminToggle: (response: boolean) => void
}

/** Component Description
 * <props> is a generic type paremeter for this functional component,
 *  this tells typescript that this component expects to recieve the props defined in the above Props type
 *  
 * A generic type parameter is a placeholder that allows you to create reusable components or functions with flexible types. 
 * 
 */
const LoginForm: React.FC<Props> = ({ adminToggle, onRegToggle }) => {
    //Dont know what formik is
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        /**Validation Schema Description
         * -apart of the Yup libary, throws 
         * 
         */
        validationSchema: Yup.object({
            username: Yup.string()
                .max(15, 'Must be 15 characters or less') //where does this string get sent to
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
    // Need to add a table head, table body and table footer or the browser complains in the console.
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