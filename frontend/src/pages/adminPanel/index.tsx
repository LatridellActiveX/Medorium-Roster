import PageInitialization from '../../ui/pageInitialization';
import RequestCode from './requestCode';

const AdminPanelPage: React.FC = () => {
    return <PageInitialization pathIfUnauth='/login'>
        <main className='p-2'>
            <h1>Admin Panel</h1>
            <RequestCode />
        </main>
    </PageInitialization >
}

export default AdminPanelPage;