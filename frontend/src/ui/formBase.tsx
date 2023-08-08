import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { ReactNode, useState } from "react";
import Input from "./input";
import type { ResponseZodError, ResponseErrorMessage } from "./../../../api/types"; //'api/types throws me an error for some reason: Cannot find module 'api/types' or its corresponding type declarations.'
import cn from "classnames";
import Select, { OptionType } from "./select";

export type FormInputType =
  | {
      name: string;
      label?: string;
      type?: string;
      variant?: "default" | "select";
      selectItems?: OptionType[];
    }
  | string;

type Props = {
  initialValues: {
    [key: string]: string;
  };
  validationSchema: any;
  apiUrl: string;
  onSubmitSuccess: (values: Props["initialValues"]) => void;
  heading: string;
  inputs: FormInputType[];
  formatRequestData?: (data: Props["initialValues"]) => {
    [key: string]: string | boolean;
  };
  submitBtnSign?: string;
  navigateTo?: string;
  children?: ReactNode;
  className?: string;
};

const FormBase: React.FC<Props> = ({
  initialValues,
  validationSchema,
  apiUrl,
  onSubmitSuccess,
  heading,
  inputs,
  formatRequestData,
  submitBtnSign = "Submit",
  children,
  className,
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
          axios.post(apiUrl, formattedValues, { withCredentials: true }),
          {
            pending: "Loading...",
            success: "Success!",
            error: "Something went wrong.",
          }
        );

        if (response.status === 200) {
          onSubmitSuccess(values);
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
          let errors: Props["initialValues"] = {};

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
        typeof input === "string"
          ? input.toLowerCase()
          : input.name.toLowerCase();

      if (formik.errors[inputName]) {
        return true;
      }
    }
    return false;
  };

  return (
    <form
      className={cn(
        "flex flex-col items-center max-w-xs px-4 rounded-xl py-4 bg-neutral-800 bg-opacity-90 sm:px-9",
        className
      )}
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4 text-2xl">{heading}</h1>
      <div className="w-full">
        {inputs.map((i, index) => {
          let inputName =
            typeof i === "string" ? i.toLowerCase() : i.name.toLowerCase();
          let inputLabel =
            typeof i === "object" && i.label ? i.label : inputName;

          if (
            typeof i === "object" &&
            i.variant === "select" &&
            i.selectItems
          ) {
            return (
              <Select
                label={inputLabel}
                data={i.selectItems}
                name={inputName}
                onChange={formik.handleChange}
                key={index}
              />
            );
          }

          return (
            <Input
              label={inputLabel}
              error={formik.errors[inputName]}
              value={formik.values[inputName]}
              type={typeof i === "object" ? i.type : undefined}
              handleChange={formik.handleChange}
              key={index}
            />
          );
        })}
      </div>

      {serverError && <small className="text-red-600">{serverError}</small>}

      <button
        className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed text-white text-base font-bold py-2 rounded-md cursor-pointer w-full transition-colors mt-5 mb-6"
        disabled={isDisabled()}
        type="submit"
        aria-label={`Submit your ${heading.toLowerCase()} credentials`} // for accessibility
      >
        {submitBtnSign}
      </button>
      {children}
    </form>
  );
};

export default FormBase;
