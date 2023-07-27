import Header from '../../layout/header';
import PageInitialization from '../../ui/pageInitialization';
import RegForm from './regForm';

const RegestrationPage: React.FC = () => {
    return <PageInitialization pathIfAuth='/'>
        <main>
            <Header/>
            <h2>Registration</h2>
            <RegForm />
        </main>
    </PageInitialization>
};

export default RegestrationPage;