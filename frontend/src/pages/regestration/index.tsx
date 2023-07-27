import PageInitialization from '../../ui/pageInitialization';
import RegForm from './regForm';

const RegestrationPage: React.FC = () => {
    
    return <PageInitialization className='bg-img1' pathIfAuth='/'>
        <main className='bg-img1'>
            <h2>Registration</h2>
            <RegForm />
        </main>
    </PageInitialization>
};

export default RegestrationPage;