import PageInitialization from '../../ui/pageInitialization';
import RegForm from './regForm';

const RegestrationPage: React.FC = () => {

    return <PageInitialization>
        <main>
            <h2>Registration</h2>
            <RegForm />
        </main>
    </PageInitialization>
};

export default RegestrationPage;