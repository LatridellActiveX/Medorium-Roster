import { Link } from "react-router-dom";
import PageInitialization from "../../ui/pageInitialization";

/*
React.FC (.FC) is the typescript Type for Functional Components
*
* 
*
*/

const MainPage: React.FC = () => {

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