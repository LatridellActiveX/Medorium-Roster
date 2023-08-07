import PageInitialization from '../../ui/pageInitialization';
import RegForm from './regForm';

const RegistrationPage: React.FC = () => {
    return <PageInitialization pathIfAuth='/'>
        <main className="bg-img--1 flex flex-col items-center">
            <div className="flex my-auto">
                <RegForm />
            </div>
        </main>
    </PageInitialization >
};

export default RegistrationPage;