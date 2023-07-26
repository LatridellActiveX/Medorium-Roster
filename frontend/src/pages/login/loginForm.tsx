import axios from 'axios';
//what is formik?
import { useFormik } from 'formik';
//Yup is for schema validation
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
        /**Validation Schema Description
         * -apart of the Yup libary, throws 
         * 
         */
        validationSchema: Yup.object({
            username: Yup.string()
                .max(15, 'Must be 15 characters or less') //where does this string get sent to
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
                    axios.post('http://localhost:3000/auth/login', values, {
                        withCredentials: true,
                    }),
                    {
                        pending: 'Pending...',
                        success: 'Success!',
                        error: 'Incorrect email or password'
                    }
                )

                if (response.status === 200) {
                    dispatch(authorizeUser({
                        username: values.username,
                        //something else later
                    }));
                    navigate('/');
                    resetForm();
                };

            } catch (error) {
                console.error('Error communicating with server: ', error);
            };
        },
    });

    return <form id='formArea' onSubmit={formik.handleSubmit}>
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
        <button
            className="bg-blue-400 hover:bg-blue-600 text-white font-bold px-4 rounded cursor-pointer transition-colors"
            disabled={!!formik.errors.password || !!formik.errors.username} //double negation is fast way to convert a string to boolean
            type="submit"
            aria-label='Submit your login credentials' //for accessibility 
        >
            Submit
        </button>
        <p>First Time?</p>
        <div className="bg-blue-400 hover:bg-blue-600 text-white font-bold px-4 rounded transition-colors">
            <Link to='/regestration'>Register</Link>
        </div>
    </form>
};

export default LoginForm;