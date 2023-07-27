import Header from "../../layout/header";
import PageInitialization from "../../ui/pageInitialization";
import LoginForm from "./loginForm";

const LoginPage: React.FC = () => {
    return <PageInitialization pathIfAuth='/' className="bg-img--1">
        <main className="flex flex-col items-center bg-img--1 gap-32">
            <Header/>
            <LoginForm />
        </main>
    </PageInitialization>
};

export default LoginPage;