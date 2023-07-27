import { Link } from "react-router-dom";
import PageInitialization from "../../ui/pageInitialization";

const MainPage: React.FC = () => {

    return <PageInitialization className="bg-img1" pathIfUnauth="/login">
        <main className="app bg-img1">
            <h2>It is supposed to be a content that user see when he is logined and not in the admin panel</h2>

            <div className="grid gap-y-5 text-black mt-10">
                <Link to='/login'>Login</Link>
                <Link to='/regestration'>Regestration</Link>
                <Link to='/adminPanel'>Admin panel</Link>
                <Link to='/FAQ'>FAQ</Link>
            </div>
        </main>
    </PageInitialization>
};

export default MainPage;