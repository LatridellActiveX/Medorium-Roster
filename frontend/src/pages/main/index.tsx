import { Link } from "react-router-dom";
import PageInitialization from "../../ui/pageInitialization";
import Header from "../../layout/header";

const MainPage: React.FC = () => {
    return <PageInitialization pathIfUnauth="/login">
        <main className="flex items-center flex-col text-lg">
            <Header/>
            <h2>Content that user sees when logged in and not in the admin panel</h2>
            <div className="grid gap-y-5">
                <Link to='/roster'>Roster</Link>
                <Link to='/adminPanel'>Admin panel</Link>
            </div>
        </main>
    </PageInitialization>
};

export default MainPage;