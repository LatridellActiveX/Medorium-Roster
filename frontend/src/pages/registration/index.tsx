import Header from '../../layout/header';
import PageInitialization from '../../ui/pageInitialization';
import RegForm from './regForm';

const RegistrationPage: React.FC = () => {
    return <PageInitialization pathIfAuth='/'>
        <main>
            <Header/> 
            <div className="flex flex-col items-center">
            <h2>Registration</h2>
            <RegForm />
            </div>
            
        </main>
    </PageInitialization>
};

export default RegistrationPage;