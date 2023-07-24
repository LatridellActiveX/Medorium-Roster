import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Input from '../../ui/input';
import { useNavigate } from 'react-router-dom';

//Registration Form,  React Functional Component
const RegForm: React.FC = () => {
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            regcode: `#${Math.floor(100000000 + Math.random() * 900000000)}` //the implementation is temporary
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
            console.log("Registration submitted locally", values);

            try {
                let response = await axios.post('http://localhost:3000/api/regestration', values);

                if (response.data === '200') {
                    navigate('/');

                    resetForm(); //There is actually no point of resetting form because the component is unmounted at that time
                }

            } catch (e) {
                console.log('regestration form error', e)
            }

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
            <Input
                label='Registration Code'
                name='regcode'
                error={formik.errors.regcode}
                value={formik.values.regcode}
                handleChange={formik.handleChange}
            />
        </div>
        <button
            disabled={!!formik.errors.password || !!formik.errors.username || !!formik.errors.regcode} //double negation is fast way to convert a string to boolean
            type="submit"
            aria-label='Submit your regestration credentials' //for accessibility 

        >
            Submit
        </button>
    </form>
};

export default RegForm;