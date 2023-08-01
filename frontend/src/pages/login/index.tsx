import Header from "../../layout/header";
import PageInitialization from "../../ui/pageInitialization";
import LoginForm from "./loginForm";

const LoginPage: React.FC = () => {
    return <PageInitialization pathIfAuth='/'>
        <Header />
        <main className="flex flex-col items-center bg-img--1">
            <div className="flex my-auto">
                <LoginForm />
            </div>
        </main>
    </PageInitialization>
};

export default LoginPage;