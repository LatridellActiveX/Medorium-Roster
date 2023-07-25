import axios from 'axios';
//what is formik?
import { useFormik } from 'formik';
//Yup is for schema validation
import * as Yup from 'yup';
import Input from '../../ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginForm: React.FC = () => {
    let navigate = useNavigate();

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
                let response = await toast.promise(
                    axios.post('http://localhost:3000/auth/login', values),
                    {
                        pending: 'Pending...',
                        success: 'Success!',
                        error: 'Incorrect email or password'
                    }
                )

                if (response.status === 200) {
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
            disabled={!!formik.errors.password || !!formik.errors.username} //double negation is fast way to convert a string to boolean
            type="submit"
            aria-label='Submit your login credentials' //for accessibility 
        >
            Submit
        </button>
        <div>
            <p>First Time?</p>
            <Link to='/regestration'>Register</Link>
        </div>
    </form>
};

export default LoginForm;