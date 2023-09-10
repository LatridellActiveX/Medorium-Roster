import PageInitialization from "../../ui/pageInitialization";
import LoginForm from "./loginForm";
import background from "../../assets/backgrounds/Eve-Atmosphere2.png";
import BlurBgImg from "../../ui/blurBgImg";

const LoginPage: React.FC = () => {
  return (
    <PageInitialization pathIfAuth="/">
      <main
        className="flex flex-col items-center"
      >
        <BlurBgImg src={background} />
        <div className="flex my-auto z-10">
          <LoginForm />
        </div>
      </main>
    </PageInitialization>
  );
};

export default LoginPage;
