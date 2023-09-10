import PageInitialization from "../../ui/pageInitialization";
import background from "../../assets/backgrounds/Eve-Atmosphere.png";
import CallToActionButton from "../../ui/callToActionButton";
import BlurBgImg from "../../ui/blurBgImg";

const LandingPage: React.FC = () => {
  return (
    <PageInitialization>
      <main className="flex flex-col items-center bg-center bg-no-repeat bg-cover h-screen">
        <BlurBgImg src={background} />
        <div className="flex flex-col justify-between items-center mt-20 gap-32 z-10">
          <div className="flex flex-col text-center gap-6">
            <h1 className="text-7xl text-slate-100">MP Collective Network</h1>
            <h2 className="text-3xl">Organizational Toolkit</h2>
          </div>

          <CallToActionButton to="/login" />
        </div>
      </main>
    </PageInitialization>
  );
};

export default LandingPage;
