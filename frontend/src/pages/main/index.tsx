import { Link } from "react-router-dom";
import PageInitialization from "../../ui/pageInitialization";
import useAuthRedirect from "../../hooks/useAuthRedirect";

const MainPage: React.FC = () => {
    useAuthRedirect(null, '/login');

    return <PageInitialization>
        <main className="app">
            <h2>It is supposed to be a content that user see when he is logined and not in the admin panel</h2>

            <div className="grid gap-y-5 text-black mt-10">
                <Link to='/login'>Login</Link>
                <Link to='/regestration'>Regestration</Link>
                <Link to='/adminPanel'>Admin panel</Link>
            </div>
        </main>
    </PageInitialization>
};

export default MainPage;