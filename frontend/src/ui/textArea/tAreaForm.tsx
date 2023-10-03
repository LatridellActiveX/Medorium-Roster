import { useFormik } from "formik";
import axios, { AxiosError,  AxiosResponse} from "axios";
import { toast } from "react-toastify";
import { getToastMessage } from "../formBase.tsx";
import  type { ResponseErrorMessage, ResponseZodError } from "api/types";
import { TextArea } from "../input";
import { HTMLInputTypeAttribute, useState } from "react";
import { OptionType } from "../select";



export type textAreaInputType =  {
	label: string;
	name: string;
	type?: HTMLInputTypeAttribute;
	variant?: "default" | "select";
	selectedItems?: OptionType[];
	disabled?: boolean;
	required?: boolean;
	placeholder: string;
}

type TAFormInputType = {
	[key: string]: string | undefined | number;
};

type Props = {
	initialValues: TAFormInputType;
	validationSchema: any;
	apiUrl: string;
	onSubmitSuccess: (
		values: Props["initialValues"],
		response: AxiosResponse<any, any>
	) => void;
	heading: string;
	inputs: textAreaInputType;
	formatRequestData?: (data: Props["initialValues"]) => any;
	apiMethod?: "post" | "put" | "get" | "delete";
	submitBtnSign?: string;
	navigateTo?: string;
	children?: React.ReactNode;
	classNames?: string;
	fieldContainerClassName?: string;
	isH1Heading?: boolean;
	id?: string;
	placeholder?: string;
	toastMessages?: {
		pending?: string | null;
		success?: string | null;
		error?: string | null;
	};
};

/**Customizable singular Text Area form 
 * 
 * @param initialValues - TAFormInputType object, initial values for form
 * @param validationSchema - validation schema object to validate inputs
 * @param apiUrl - string, api url for form submission
 * @param onSubmitSuccess - callback function to handle submission success
 * @param heading - string, heading for form
 * @param inputs - textAreaInputType object, inputs for textArea properties
 * @param formatRequestData - callback function to format request data
 * @param apiMethod - lowercase string, api method for form - defaults to "post"
 * @param submitBtnSign - string, submit button sign
 * @param navigateTo - string, page to navigate to apon submission. 
 * @param className - string, additional CSS classes to apply
 * @param fieldContainerClassName - string, additional classes for container element of input
 * @param isH1Heading - boolean,  denoting if heading is h1 or h2
 * @param id - optional - string, ID for form. 
 * @param toastMessages - toast messages object, custom messages for .pending, .success and .error apon form use
 * @returns Customized Form element
 */
const TextAreaForm: React.FC<Props> = ({
	initialValues, 
	validationSchema,
	apiUrl,
	apiMethod = "post",
	onSubmitSuccess,
	heading,
	inputs,
	formatRequestData,
	submitBtnSign = "Submit",
	classNames,
	children,
	fieldContainerClassName,
	isH1Heading,
	id,
	toastMessages,
}) => {
	const [serverError, setServerError] = useState<string | null>(null);

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values, { resetForm }) => {
			try {
				setServerError(null);
				let formattedValues = formatRequestData
					? formatRequestData(values)
					: values;

				const response = await toast.promise(
					axios({
						url: apiUrl,
						method: apiMethod,
						data: formattedValues,
					}),
					{
						pending: getToastMessage("Loading...", toastMessages?.pending),
						success: getToastMessage("Success!", toastMessages?.success),
						error: getToastMessage(
							"Something went wrong.",
							toastMessages?.error
						),
					}
				);
				if (response.status === 200) {
					onSubmitSuccess(values, response);
					resetForm();

				}
			} catch (e) {
				let err = e as AxiosError;
				let response = err.response?.data as
					| ResponseErrorMessage
					| ResponseZodError;

				if ("error" in response) {
					// ResponseErrorMessage
					setServerError(response.error);
				} else {
					// ResponseZodError
					let errors: {[key: string]: string } = {};

					response?.forEach((e)=> {
						errors[e.path[0]] = e.message;
					});
				}
				}
		},
		enableReinitialize: true,
	});

	const isDisabled = () => {
		return Object.keys(formik.errors).length > 0 || formik.isSubmitting;
	};
3
	return (
		<div className={classNames}>
		<form
			id={id}
			onSubmit={formik.handleSubmit}
			autoComplete="off"
		>
			{isH1Heading ? <h1>{heading}</h1> : <h2>{heading}</h2>}
			<TextArea 
				label={inputs.label}
				name={inputs.name}
				type={inputs.type}
				disabled={inputs.disabled}
				required={inputs.required}
				placeholder={inputs.placeholder}
				value={formik.values[inputs.name]}
				handleChange={formik.handleChange}
				error={formik.errors[inputs.name]}
				className={fieldContainerClassName}
				/>

				{serverError && <small className="text-red-600">{serverError}</small>}

				<button
					type="submit"
					disabled={isDisabled()}
					className="btn btn-primary">
						{submitBtnSign}
					</button>
		</form>
		{children}
		</div>
	);
};
export default TextAreaForm;
