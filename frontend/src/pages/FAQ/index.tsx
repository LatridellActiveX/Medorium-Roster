import Footer from "../../layout/footer";
import Paragraphs from "../../ui/paragraphs";
import { ParagraphType } from "../../ui/paragraphs/paragraph";

const data: ParagraphType[] = [
    {
        heading: 'What is EVE Online?',
        texts: 'EVE Online is a massively multiplayer online game set in space, where players can explore, engage in combat, and build their own empires.'
    },
    {
        heading: 'What is the Medor Roster website?',
        texts: 'The Medor Roster website is a platform that allows you to view your characters rank and role information in your corp, as well as the corp administrators to assign and view your ranks and roles.'
    },
    {
        heading: 'How do I access the Medor Roster website?',
        texts: 'To access the Medor Roster website, you need to have a registration link provided by your admin. Once you have the link, simply navigate to the website though the link and enter your registration credentials to access the website and your information.'
    },
    {
        heading: 'What kind of information can I view on the Medor Roster website?',
        texts: 'On the Medor Roster website, you can view information about your position in your corp, such as your rank, roles and time served.'
    },
    {
        heading: 'Can I register for the Medor Roster website without a registration code?',
        texts: 'No, you cannot register for the Medor Roster website without a registration code provided by your admin.',
        id: 'registrationCode'
    },
    {
        heading: 'What if I have issues accessing my character information on the Medor Roster website?',
        texts: 'If you have any issues accessing your character information on the Medor Roster website, please contact your admin for assistance.'
    },
    {
        heading: 'Is the Medor Roster website affiliated with EVE Online?',
        texts: 'No, the Medor Roster website is not affiliated with EVE Online or its parent company CCP Games.'
    },
]

const FAQPage: React.FC = () => {
    return <>
        <main className="px-4 flex flex-col justify-center items-center">
            <h1 className="text-2xl sm:text-3xl font-bold mt-5 sm:mt-10">Frequently Asked Questions (FAQ)</h1>
            <Paragraphs
                className="gap-y-5 mt-5 sm:mt-10 max-w-2xl"
                itemClassNames={{
                    className: 'gap-y-2.5',
                    headingClassName: 'text18-20 font-semibold',
                    textClassName: 'text14-18'
                }}
                data={data}
            />
            <Footer />
        </main>
    </>
};

export default FAQPage;