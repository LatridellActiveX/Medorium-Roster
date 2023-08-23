import { Link, useSearchParams } from "react-router-dom";
import PageInitialization from "../../ui/pageInitialization";
import RegForm from "./regForm";
import Error from "./error";

const errorMsgs = {
  noCode: "You need a valid registration code to create an account.",
  codeLength: [
    "Your code is too short/long.",
    "Please contact to admin to provide you a correct access code",
  ],
};

const RegistrationPage: React.FC = () => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const accessCode = searchParams.get("accessCode") ?? "";

  if (!accessCode) {
    return (
      <Error msgs={errorMsgs.noCode}>
        <p>
          Please contact your admin to resolve
          <Link to="/faq#registrationCode"> the issue.</Link>
        </p>
      </Error>
    );
  }
  if (accessCode.length < 100 || accessCode.length > 200) {
    return <Error msgs={errorMsgs.codeLength} />;
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
