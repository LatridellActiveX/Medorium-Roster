import PageInitialization from '../../ui/pageInitialization';

const AdminPanelPage: React.FC = () => {
    return <PageInitialization pathIfUnauth='/login'>
        <main>
            <h2>Admin Panel</h2>
        </main>
    </PageInitialization >
}

export default AdminPanelPage;