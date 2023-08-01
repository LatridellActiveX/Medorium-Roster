import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReactNode, useState } from 'react';
import Input from './input';
import capitalize from '../helpers/capitalize';

type InputType = {
    name: string
    type?: string
} | string

type Props = {
    initialValues: {
        [key: string]: string
    }
    validationSchema: any
    apiUrl: string
    onSubmitSuccess: (values: Props['initialValues']) => void
    heading: string
    inputs: InputType[]
    navigateTo?: string
    children?: ReactNode
}

const FormBase: React.FC<Props> = ({ initialValues, validationSchema, apiUrl, onSubmitSuccess, heading, inputs, navigateTo = '/', children }) => {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState<string | null>(null);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setServerError(null);

                const response = await toast.promise(
                    axios.post(apiUrl, values, { withCredentials: true }),
                    {
                        pending: 'Loading...',
                        success: 'Success!',
                        error: 'Something went wrong.'
                    }
                )

                if (response.status === 200) {
                    onSubmitSuccess(values);
                    navigate(navigateTo);
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

    const checkIfDisabled = () => {
        let isDisabled = false;

        inputs.forEach(i => {
            let inputName = typeof i === 'string' ? i : i.name;

            if (!!formik.errors[inputName]) {
                isDisabled = true;
            };
        });

        return isDisabled;
    };

    return <form id='formArea' className="flex flex-col items-center w-80 px-9 rounded-xl py-4 shadow-2xl bg-neutral-800 bg-opacity-90" onSubmit={formik.handleSubmit}>
        <div className="w-full">
            <table className="w-full">
                <thead>
                    <h2 className='text-center mb-4 text-2xl'>{heading}</h2>
                </thead>
                <tbody>
                    {inputs.map((i, index) => {
                        let inputName = typeof i === 'string' ? i : i.name;

                        return <tr key={index}>
                            <Input
                                label={capitalize(inputName)}
                                error={formik.errors[inputName]}
                                value={formik.values[inputName]}
                                type={typeof i === 'object' ? i.type : undefined}
                                handleChange={formik.handleChange}
                            />
                        </tr>

                    })}
                </tbody>
            </table>
        </div>

        {serverError && <small className='text-red-600'>{serverError}</small>}

        <button
            className="bg-blue-600 hover:bg-blue-500 text-white text-base font-bold py-2 rounded-md cursor-pointer w-full transition-colors mt-5 mb-6"
            disabled={checkIfDisabled()}
            type="submit"
            aria-label={`Submit your ${heading.toLowerCase()} credentials`} // for accessibility 
        >
            Submit
        </button>
        {children}
    </form>
};

export default FormBase;