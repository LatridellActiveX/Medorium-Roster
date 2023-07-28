import axios, { AxiosError } from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Input from '../../ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { authorizeUser } from '../../redux/reducers/authReducer';

const RegForm: React.FC = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [serverError, setServerError] = useState<string | null>(null);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(32, 'Must be 32 characters or less')
                .min(6, 'Your name is too short')
                .required('Required'),
            password: Yup.string()
                .max(128, 'Must be 128 characters or less')
                .min(8, 'Your password is too short')
                .required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {

            try {
                let response = await toast.promise(
                    axios.post('http://localhost:3000/auth/register?accessCode=', values, { withCredentials: true }),
                    {
                        pending: 'Pending...',
                        success: 'Success!',
                        error: 'Something went wrong.'
                    }
                )

                if (response.status === 200) {
                    dispatch(authorizeUser(values.username));
                    navigate('/');
                    resetForm();
                };

            } catch (e) {
                let err = e as AxiosError;

                let response = err.response?.data as { error: string } | undefined;

                if (response?.error) { //custom errors from the api
                    setServerError(response.error);
                } else { //errors from zod
                    let response = err.response?.data as { path: string[], message: string }[] | undefined;

                    formik.setErrors({
                        username: response?.find(i => i.path[0] === 'username')?.message,
                        password: response?.find(i => i.path[0] === 'password')?.message,
                    });
                }
            }

        },
    });

    return <form className='flex flex-col' id='formArea' onSubmit={formik.handleSubmit}>
        <div>
            <Input
                label='Username'
                error={formik.errors.username}
                value={formik.values.username}
                handleChange={formik.handleChange}
            />
            <Input
                label='Password'
                type='password'
                error={formik.errors.password}
                value={formik.values.password}
                handleChange={formik.handleChange}
            />
        </div>

        {serverError && <small className='text-red-600'>{serverError}</small>}

        <button
            disabled={!!formik.errors.password || !!formik.errors.username} //double negation is fast way to convert a string to boolean
            type="submit"
            aria-label='Submit your regestration credentials' //for accessibility 
        >
            Submit
        </button>
    </form>
};

export default RegForm;