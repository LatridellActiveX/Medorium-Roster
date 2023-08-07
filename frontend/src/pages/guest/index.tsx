import PageInitialization from "../../ui/pageInitialization";
import background from "../../assets/backgrounds/Eve-Atmosphere2.png";

const LandingPage: React.FC = () => {
    return <PageInitialization>
        <main
            style={{ backgroundImage: `url(${background})` }}
            className="flex flex-col items-center bg-center bg-no-repeat bg-cover h-screen">
            <div className="flex flex-col justify-between items-center h-full mt-16 mb-32 ">
                <div className="flex flex-col text-center ">
                    <h1 className="text-7xl">Medorium Roster</h1>
                    <h2 className="text-3xl">Best way to blah blah blah...</h2>
                </div>

                <button className="border-2 w-fit border-slate-200 text-slate-200 hover:border-slate-400 text-2xl px-12 py-2">Get Started</button>
            </div>
        </main>
    </PageInitialization>
};

export default LandingPage;