import axios, { AxiosError } from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Input from '../../ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegForm: React.FC = () => {
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
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
                let response = await toast.promise(
                    axios.post('http://localhost:3000/auth/register?accessCode=', values, { withCredentials: true }),
                    {
                        pending: 'Pending...',
                        success: 'Success!',
                        error: 'Incorrect username or password'
                    }
                )

                if (response.status === 200) {
                    navigate('/');
                    resetForm();
                };

            } catch (e) {
                let err = e as AxiosError;

                console.error(err.code)
            }

        },
    });

    return <form id='formArea' onSubmit={formik.handleSubmit} className="flex flex-col items-center">
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
            className="bg-blue-600 hover:bg-blue-500 text-white text-base font-bold py-2 rounded-md cursor-pointer w-full transition-colors mt-5 mb-6 "
            disabled={!!formik.errors.password || !!formik.errors.username} //double negation is fast way to convert a string to boolean
            type="submit"
            aria-label='Submit your regestration credentials' //for accessibility 
        >
            Submit
        </button>
    </form>
};

export default RegForm;