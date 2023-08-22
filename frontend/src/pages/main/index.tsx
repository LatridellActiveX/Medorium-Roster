import PageInitialization from "../../ui/pageInitialization";

const MainPage: React.FC = () => {
    return <PageInitialization pathIfUnauth="/login">
        <main className="flex items-center flex-col text-lg">
            <h2>Logged in view</h2>
        </main>
    </PageInitialization>
};

export default MainPage;