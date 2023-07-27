import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../../ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authorizeUser } from '../../redux/reducers/authReducer';
import { useDispatch } from 'react-redux';

const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Dont know what formik is
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        // Yup validation schema description
        // These error strings will be available in formik.errors.username or formik.errors.password if these fields fail the validation
        validationSchema: Yup.object({
            username: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .min(4, 'Your name is too short')
                .required('Required'),
            password: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .min(4, 'Your password is too short')
                .required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await toast.promise(
                    axios.post('http://localhost:3000/auth/login', values, { withCredentials: true }),
                    {
                        pending: 'Loading...',
                        success: 'Success!',
                        error: 'Incorrect username or password'
                    }
                )

                if (response.status === 200) {
                    dispatch(authorizeUser(values.username));
                    navigate('/');
                    resetForm();
                }

            } catch (error) {
                console.error('Error communicating with server: ', error);
            }
        },
    });

    return <form id='formArea' className="flex flex-col items-center w-80 px-9 rounded-xl py-4 shadow-2xl" onSubmit={formik.handleSubmit}>
        <div>
            <table>
                <thead>
                    <h2 className='text-center mb-4'>Login</h2>
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

        <button
            className="bg-blue-500 hover:bg-blue-600 text-white text-base font-bold py-2 rounded-md cursor-pointer px-5 w-full transition-colors mt-3 mb-6"
            disabled={!!formik.errors.password || !!formik.errors.username} //double negation is fast way to convert a string to boolean
            type="submit"
            aria-label='Submit your login credentials' //for accessibility 
        >
            Submit
        </button>
        <small className='mt-5'>
            <span>First time here? </span>
            <Link className='text-blue-400 transition-colors underline hover:text-blue-600' to='/FAQ#registrationCode'>
                Ask you admin to give you a regestration link.
            </Link>
        </small>
    </form>
};

export default LoginForm;