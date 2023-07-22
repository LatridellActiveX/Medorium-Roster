import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';


//make sure its css lines up with the login form as well.
 
/*we need to have an endpoint it sends the information to but 
first we need to create its look and make sure it appears on the
page correctly using a table and css. 
*/

const RegForm: React.FC = () => {

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            regcode: `#${Math.floor(100000000 + Math.random() * 900000000)}` //the implementation is temporary
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            password: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            console.log("Registration submitted locally", values);

            try {
                // let response = axios.post('http://localhost:3000/api/reg', values);

                resetForm();
            } catch (e) {
                console.log('regestration form error', e)
            }

        },
    });

    return <section>
        <h1>Test Registration Form</h1>,
        <form id="Rform" onSubmit={formik.handleSubmit}>
            <table>
                <tr>
                    <td><label id="RuName"><strong>Username:</strong></label></td>
                    <td><input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} required></input></td>
                </tr>
                <tr>
                    <td><label id="Rpass"><strong>Password:</strong></label></td>
                    <td><td><input type="password" name="username" value={formik.values.password} onChange={formik.handleChange} required></input></td></td>
                </tr>
                <tr>
                    <td><label id="regCode"><strong>Registration Code</strong>:</label></td>
                    <td><td><input type="text" name="regCode" value={formik.values.regcode} disabled required></input></td></td>
                </tr>
                <tr>
                    <td><button type="submit">Register</button></td>
                    <td><a id="loginReturn" href="/">Return to login</a></td>
                </tr>
            </table>

        </form>
    </section>
};

export default RegForm;