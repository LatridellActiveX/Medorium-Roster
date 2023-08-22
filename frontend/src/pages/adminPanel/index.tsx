import PageInitialization from '../../ui/pageInitialization';
import RequestCode from './requestCode';

const AdminPanelPage: React.FC = () => {
    return <PageInitialization pathIfUnauth='/login'>
        <main className='max-w-2xl mx-auto p-2'>
            <h1 className='text-2xl text-center sm:text-3xl'>Admin Panel</h1>
            <RequestCode />
        </main>
    </PageInitialization >
}

export default AdminPanelPage;