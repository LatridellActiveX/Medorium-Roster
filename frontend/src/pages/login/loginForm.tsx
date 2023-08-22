import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import FormBase from "../../ui/formBase";
import useCurrentUser from "../../hooks/useCurrentUser";
import { AxiosResponse } from "axios";

const initialValues = {
  username: "",
  password: "",
};
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

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  let { setCurrentUser } = useCurrentUser();

  const onSubmitSuccess = (values: { [key: string]: string }, response: AxiosResponse) => {
    setCurrentUser({
      username: values?.username,
      isAdmin: response.data?.isAdmin,
    });
    navigate("/");
  };

  return (
    <FormBase
      className="max-w-xs shadow-2xl"
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
