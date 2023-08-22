import * as Yup from "yup";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FormBase from "../../ui/formBase";
import useCurrentUser from "../../hooks/useCurrentUser";
import ErrorPreview from "./errorPreview";

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
const errorMsgs = {
  noCode: "You need a valid registration code to create an account.",
  codeLength: [
    "Your code is too short/long.",
    "Please contact to admin to provide you a correct access code",
  ],
};

const RegForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, _setSearchParams] = useSearchParams();
  const accessCode = searchParams.get("accessCode") ?? "";
  let { setCurrentUser } = useCurrentUser();

  const onSubmitSuccess = (values: { [key: string]: string }) => {
    setCurrentUser({
      username: values?.username,
    });
    navigate("/");
  };

  if (!accessCode) {
    return (
      <ErrorPreview msgs={errorMsgs.noCode}>
        <p>
          Please contact your admin to resolve
          <Link to="/faq#registrationCode"> the issue.</Link>
        </p>
      </ErrorPreview>
    );
  }
  if (accessCode.length < 100 || accessCode.length > 200) {
    return (
      <ErrorPreview msgs={errorMsgs.codeLength}>
        <p></p>
      </ErrorPreview>
    );
  }

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
        <p>
          Already got an account? <Link to="/login">Log in</Link> here
        </p>
      </small>
    </FormBase>
  );
};

export default RegForm;
