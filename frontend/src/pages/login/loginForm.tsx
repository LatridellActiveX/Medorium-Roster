import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import FormBase, { FormBaseInputType } from "../../ui/formBase";
import useCurrentUser from "../../hooks/useCurrentUser";
import { AxiosResponse } from "axios";

const initialValues = {
  username: "",
  password: "",
};
/** Sets the requirements for the password input*/
const validationSchema = Yup.object({
  username: Yup.string()
    .max(32, "Must be 32 characters or less")
    .min(6, "Your name is too short")
    .required("Required"),
  password: Yup.string()
    .max(128, "Must be 128 characters or less")
    .min(8, "Your password is too short")
    .required("Required"),
});

const inputs = [
  "username",
  {
    name: "password",
    type: "password",
  },
];

/**Login form component complete with schema validation and other links. 
 * 
 * @returns Login form component
 */
const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  let { setCurrentUser } = useCurrentUser();

  const onSubmitSuccess = (
    values: FormBaseInputType,
    response: AxiosResponse
  ) => {
    if (typeof values.username !== "string") return;

    setCurrentUser({
      username: values?.username,
      isAdmin: response.data?.isAdmin,
    });
    navigate("/");
  };

  return (
    <FormBase
      className="max-w-xs shadow-2xl" // sets max width and creates shadow
      initialValues={initialValues}
      validationSchema={validationSchema}
      apiUrl="auth/login"
      onSubmitSuccess={onSubmitSuccess}
      heading="Login"
      inputs={inputs}
      toastMessages={{
        success: null,
      }}
      isH1Heading
    >
      <small>
        <p>
          First time here? Ask your admin for a{" "}
          <Link to="/registration">Registration Link</Link> or{" "}
          <Link to="/FAQ#registrationCode">Learn More</Link>
        </p>
      </small>
    </FormBase>
  );
};

export default LoginForm;
