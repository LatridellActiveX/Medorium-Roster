import useAuthRedirect from '../../hooks/useAuthRedirect';
import PageInitialization from '../../ui/pageInitialization';
import RegForm from './regForm';

const RegestrationPage: React.FC = () => {
    useAuthRedirect('/');

    return <PageInitialization>
        <main>
            <h2>Registration</h2>
            <RegForm />
        </main>
    </PageInitialization>
};

export default RegestrationPage;