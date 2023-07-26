import useAuthRedirect from "../../hooks/useAuthRedirect";
import PageInitialization from "../../ui/pageInitialization";

const ProfilePage: React.FC = () => {
    useAuthRedirect(null, '/login');

    return <PageInitialization>
        <main>
            <h1>Here is your profile</h1>
        </main>
    </PageInitialization>
};

export default ProfilePage;