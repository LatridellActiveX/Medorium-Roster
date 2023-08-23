import * as Yup from "yup";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FormBase from "../../ui/formBase";
import useCurrentUser from "../../hooks/useCurrentUser";
import Error from "./error";

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

type Props = {
  accessCode: string;
};

const RegForm: React.FC<Props> = ({ accessCode }) => {
  const navigate = useNavigate();
  let { setCurrentUser } = useCurrentUser();

  const onSubmitSuccess = (values: { [key: string]: string }) => {
    setCurrentUser({
      username: values?.username,
    });
    navigate("/");
  };

  return (
    <FormBase
      className="max-w-xs shadow-2xl"
      initialValues={initialValues}
      validationSchema={validationSchema}
      apiUrl={`auth/register?accessCode=${accessCode}`}
      onSubmitSuccess={onSubmitSuccess}
      heading="Registration"
      inputs={inputs}
      isH1Heading
    >
      <small>
        Already got an account? <Link to="/login">Log in</Link> here
      </small>
    </FormBase>
  );
};

export default RegForm;
