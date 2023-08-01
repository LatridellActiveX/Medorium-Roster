import Header from "../../layout/header";
import PageInitialization from "../../ui/pageInitialization";
import LoginForm from "./loginForm";

const LoginPage: React.FC = () => {
    return <PageInitialization pathIfAuth='/' className="bg-img--1">
        <Header />
        <main className="bg-img--1">
            <LoginForm />
        </main>
    </PageInitialization>
};

export default LoginPage;