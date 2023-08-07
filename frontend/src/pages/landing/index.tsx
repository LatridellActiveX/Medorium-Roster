import PageInitialization from "../../ui/pageInitialization";
import background from "../../assets/backgrounds/Eve-Atmosphere.png";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
    return <PageInitialization>
        <main
            style={{ backgroundImage: `url(${background})` }}
            className="flex flex-col items-center bg-center bg-no-repeat bg-cover h-screen">
            <div className="flex flex-col justify-between items-center mt-20 gap-80">
                <div className="flex flex-col text-center gap-6">
                    <h1 className="text-7xl text-slate-100">Medorium Roster</h1>
                    <h2 className="text-3xl">Best way to blah blah blah...</h2>
                </div>

                <Link to="/login" className="hover:text-slate-300 rounded-md w-fit border-slate-200 backdrop-blur-lg hover:border-slate-300 border-2 text-slate-200 text-2xl font-semibold px-14 py-3">Get Started</Link>
            </div>
        </main>
    </PageInitialization>
};

export default LandingPage;