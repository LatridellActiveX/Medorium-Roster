import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { authorizeUser } from '../../redux/reducers/authReducer';
import { useDispatch } from 'react-redux';
import FormBase from '../../ui/formBase';

const initialValues = {
    username: '',
    password: '',
}
const validationSchema = Yup.object({
    username: Yup.string()
        .max(32, 'Must be 32 characters or less')
        .min(6, 'Your name is too short')
        .required('Required'),
    password: Yup.string()
        .max(128, 'Must be 128 characters or less')
        .min(8, 'Your password is too short')
        .required('Required'),
})
const inputs = [
    'username',
    {
        name: 'password',
        type: 'password'
    }
];

const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitSuccess = (values: { [key: string]: string }) => {
        dispatch(authorizeUser(values?.username));
        navigate('/');
    };

    return <FormBase
        className='shadow-2xl'
        initialValues={initialValues}
        validationSchema={validationSchema}
        apiUrl='http://localhost:3000/auth/login'
        onSubmitSuccess={onSubmitSuccess}
        heading='Login'
        inputs={inputs}
    >
        <small>
            <p>
                First time here? Ask your admin for
                a <Link to="/registration">Registration Link</Link> or <Link to="/FAQ#registrationCode">Learn More</Link>
            </p>
        </small>
    </FormBase>
};

export default LoginForm;