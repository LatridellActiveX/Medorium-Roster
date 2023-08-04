import { Link } from "react-router-dom";
import PageInitialization from "../../ui/pageInitialization";

const GuestPage: React.FC = () => {

    return <PageInitialization>
        <main>
            <h1>You are a guest here</h1>
            <Link to='/login'>Login</Link>
        </main>
    </PageInitialization>
};

export default GuestPage;