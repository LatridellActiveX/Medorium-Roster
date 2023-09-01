import { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { HTMLInputTypeAttribute, ReactNode, useState } from "react";
import Input from "./input";
import type { ResponseZodError, ResponseErrorMessage } from "api/types";
import cn from "classnames";
import Select, { OptionType } from "./select";
import axios from "../api/axios";
import connectWords from "../helpers/connectWords";

export type FormInputType =
  | {
      name: string;
      label?: string;
      type?: HTMLInputTypeAttribute;
      variant?: "default" | "select";
      selectItems?: OptionType[];
      disabled?: boolean;
      required?: boolean;
    }
  | string;

export type FormBaseInputType = {
  [key: string]: string | boolean | number | undefined;
};

type Props = {
  initialValues: FormBaseInputType;
  validationSchema: any;
  apiUrl: string;
  onSubmitSuccess: (
    values: Props["initialValues"],
    response: AxiosResponse<any, any>
  ) => void;
  heading: string | ReactNode;
  inputs: FormInputType[];
  formatRequestData?: (data: Props["initialValues"]) => any;
  apiMethod?: "post" | "delete" | "get" | "put";
  submitBtnSign?: string;
  navigateTo?: string;
  children?: ReactNode;
  className?: string;
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

const getToastMessage = (
  defaultMessage: string,
  customMessage?: string | null
) => {
  if (customMessage === undefined) {
    return defaultMessage;
  }

  return customMessage || undefined;
};

const FormBase: React.FC<Props> = ({
  initialValues,
  validationSchema,
  apiUrl,
  apiMethod = "post",
  onSubmitSuccess,
  heading,
  inputs,
  formatRequestData,
  submitBtnSign = "Submit",
  children,
  className,
  fieldContainerClassName,
  isH1Heading,
  toastMessages,
  id,
  placeholder,
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
          let errors: { [key: string]: string } = {};

          response?.forEach((e) => {
            errors[e.path[0]] = e.message;
          });

          formik.setErrors(errors);
        }
      }
    },
  });

  const isDisabled = () => {
    for (let input of inputs) {
      let inputName =
        typeof input === "string" ? connectWords(input) : input.name;

      if (formik.errors[inputName]) {
        return true;
      }
    }
    return false;
  };

  return (
    <form
      className={cn(
        "flex flex-col items-center px-4 rounded-xl py-4 bg-neutral-800 bg-opacity-90 sm:px-9",
        className
      )}
      id={id}
      onSubmit={formik.handleSubmit}
    >
      {isH1Heading ? (
        <h1 className="text-center mb-4 text-2xl">{heading}</h1>
      ) : (
        <h2 className="text-center mb-4 text-2xl">{heading}</h2>
      )}
      <div className={cn("grid gap-y-4 w-full", fieldContainerClassName)}>
        {inputs.map((i) => {
          let inputName = typeof i === "string" ? connectWords(i) : i.name;
          let inputLabel =
            typeof i === "object" && i.label ? i.label : inputName;
          let value = formik.values[inputName];
          let error = formik.errors[inputName];

          if (
            typeof i === "object" &&
            i.variant === "select" &&
            i.selectItems
          ) {
            return (
              <Select
                label={inputLabel}
                data={i.selectItems}
                error={error}
                name={inputName}
                onChange={formik.handleChange}
                key={inputName}
              />
            );
          }

          return (
            <Input
              label={inputLabel}
              error={error}
              value={value as string}
              type={typeof i === "object" ? i.type : undefined}
              name={inputName}
              handleChange={formik.handleChange}
              disabled={typeof i === "object" ? i?.disabled : undefined}
              required={typeof i === "object" ? i?.required : undefined}
              placeholder={placeholder}
              key={inputName}
            />
          );
        })}
      </div>

      {serverError && <small className="text-red-600">{serverError}</small>}

      <button
        className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed text-white text-base font-bold py-2 rounded-md cursor-pointer w-full transition-colors mt-5 mb-6"
        disabled={isDisabled()}
        type="submit"
        aria-label={typeof `Submit your credentials`} // for accessibility
      >
        {submitBtnSign}
      </button>
      {children}
    </form>
  );
};

export default FormBase;
