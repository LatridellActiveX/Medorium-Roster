import { Link, useSearchParams } from "react-router-dom";
import PageInitialization from "../../ui/pageInitialization";
import RegForm from "./regForm";
import Error from "./error";
import useAccessCodeValidation from "../../api/accessCode/useAccessCodeValidation";

const errorMsgs = {
  codeLength: [
    "Your code is too short/long.",
    "Please contact to admin to provide you a correct access code",
  ],
  incorrectCode: ["You need a valid registration code to create an account."],
};

const RegistrationPage: React.FC = () => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const accessCode = searchParams.get("accessCode");
  let { data: isCodeValid, isLoading } = useAccessCodeValidation(accessCode);

  if (isLoading) {
    return <PageInitialization pathIfAuth="/">
      <p>Loading....</p>
    </PageInitialization>
  }
  if (accessCode && (accessCode.length < 100 || accessCode.length > 200)) {
    return <Error msgs={errorMsgs.codeLength} />;
  }
  if (!isCodeValid) {
    return (
      <Error msgs={errorMsgs.incorrectCode}>
        <p>
          Please contact your admin to resolve
          <Link to="/faq#registrationCode"> the issue.</Link>
        </p>
      </Error>
    );
  }

  return (
    <PageInitialization pathIfAuth="/">
      <main className="bg-img--1 flex flex-col items-center">
        <div className="flex my-auto">
          <RegForm accessCode={accessCode} />
        </div>
      </main>
    </PageInitialization>
  );
};

export default RegistrationPage;
