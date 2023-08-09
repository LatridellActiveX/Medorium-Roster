import * as Yup from 'yup';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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

const RegForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, _setSearchParams] = useSearchParams()
    const accessCode = searchParams.get("accessCode") ?? "";

    const onSubmitSuccess = (values: { [key: string]: string }) => {
        dispatch(authorizeUser(values?.username));
        navigate('/');
    };

    if (accessCode.length < 100 || accessCode.length > 200) {
        // TODO: nicely handle the error
        return <>
            <h1>Invalid access code</h1>
        </>
    }

    return <FormBase
        className='max-w-xs shadow-2xl'
        initialValues={initialValues}
        validationSchema={validationSchema}
        apiUrl={`auth/register?accessCode=${accessCode}`}
        onSubmitSuccess={onSubmitSuccess}
        heading='Registration'
        inputs={inputs}
        isH1Heading
    >
        <small>
            <p>Already got an account? <Link to="/login">Log in</Link> here</p>
        </small>
    </FormBase>
};

export default RegForm;