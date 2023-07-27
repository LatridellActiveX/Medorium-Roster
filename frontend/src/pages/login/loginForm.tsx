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
        //where does this pull the values parameter from?
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
            a <Link to="">Registration Link</Link> or <Link to="">Learn More</Link>
            </p>
        </small>
    </form>
};

export default LoginForm;