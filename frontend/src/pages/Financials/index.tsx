import PageInitialization from "../../ui/pageInitialization";
import background from "../../assets/backgrounds/Eve-Atmosphere.png"

const FinancialPage: React.FC = () => {
    return(
        <PageInitialization>
            <main style={{backgroundImage: `url(${background})` }}>
                <p>Option to add financial data</p>
                <p>Option to view financial statement</p>
            </main>
        </PageInitialization>
    )
}

export default FinancialPage;