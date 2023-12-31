import PageInitialization from "../../ui/pageInitialization";
import LoginForm from "./loginForm";
import background from "../../assets/backgrounds/Eve-Atmosphere2.png";

const LoginPage: React.FC = () => {
    return <PageInitialization pathIfAuth='/'>
        <main style={{ backgroundImage: `url(${background})` }}
            className="flex flex-col items-center bg-center bg-no-repeat bg-cover">
            <div className="flex my-auto">
                <LoginForm />
            </div>
        </main>
    </PageInitialization>
};

export default LoginPage;