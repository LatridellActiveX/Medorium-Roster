import Header from '../../layout/header';
import PageInitialization from '../../ui/pageInitialization';
import RegForm from './regForm';

const RegistrationPage: React.FC = () => {
    return <PageInitialization pathIfAuth='/'>
        <Header />
        <main>
            <RegForm />
        </main>
    </PageInitialization>
};

export default RegistrationPage;