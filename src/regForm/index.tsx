import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Input from '../ui/input';

//Registration Form,  React Functional Component
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

    return <div>
        <h2>Registration</h2>
        <form id="Rform" onSubmit={formik.handleSubmit}>
            <div>
                <Input label='Username' value={formik.values.username} handleChange={formik.handleChange} />
                <Input label='Password' type='password' value={formik.values.password} handleChange={formik.handleChange} />
                <Input label='Registration Code' name='regcode' value={formik.values.regcode} handleChange={formik.handleChange} />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
};

export default RegForm;