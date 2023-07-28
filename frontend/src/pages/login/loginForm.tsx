import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../../ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authorizeUser } from '../../redux/reducers/authReducer';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState<string | null>(null);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        // Yup validation schema description
        // These error strings will be available in formik.errors.username or formik.errors.password if these fields fail the validation
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
        //where does this pull the values parameter from?
        onSubmit: async (values, { resetForm }) => {
            try {
                setServerError(null);

                const response = await toast.promise(
                    axios.post('http://localhost:3000/auth/login', values, { withCredentials: true }),
                    {
                        pending: 'Loading...',
                        success: 'Success!',
                        error: 'Something went wrong.'
                    }
                )

                if (response.status === 200) {
                    dispatch(authorizeUser(values.username));
                    navigate('/');
                    resetForm();
                }

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

    return <form id='formArea' className="flex flex-col items-center w-80 px-9 rounded-xl py-4 shadow-2xl bg-neutral-800 bg-opacity-90" onSubmit={formik.handleSubmit}>
        <div className="w-full">
            <table className="w-full">
                <thead>
                    <h2 className='text-center mb-4 text-2xl'>Login</h2>
                </thead>
                <tbody>
                    <tr>
                        <Input
                            label='Username'
                            error={formik.errors.username}
                            value={formik.values.username}
                            handleChange={formik.handleChange}
                        />
                    </tr>
                    <tr>
                        <Input
                            label='Password'
                            type='password'
                            error={formik.errors.password}
                            value={formik.values.password}
                            handleChange={formik.handleChange}
                        />
                    </tr>
                </tbody>
            </table>
        </div>

        {serverError && <small className='text-red-600'>{serverError}</small>}

        <button
            className="bg-blue-600 hover:bg-blue-500 text-white text-base font-bold py-2 rounded-md cursor-pointer w-full transition-colors mt-5 mb-6"
            disabled={!!formik.errors.password || !!formik.errors.username}
            type="submit"
            aria-label='Submit your login credentials' // for accessibility 
        >
            Submit
        </button>
        <small>
            <p>
                First time here? Ask your admin for
                a <Link to="/registration">Registration Link</Link> or <Link to="/FAQ#registrationCode">Learn More</Link>
            </p>
        </small>
    </form>
};

export default LoginForm;