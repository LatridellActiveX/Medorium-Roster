import Paragraphs from "../../ui/paragraphs";
import { ParagraphType } from "../../ui/paragraphs/paragraph";

const data: ParagraphType[] = [
    {
        heading: 'What is EVE Online?',
        text: 'EVE Online is a massively multiplayer online game set in space, where players can explore, engage in combat, and build their own empires.'
    },
    {
        heading: 'What is the Medor Roster website?',
        text: 'The Medor Roster website is a platform that allows you to view your character information from EVE Online in a table format. //Not really, they would think this is connected to eve\'s api, it is not'
    },
    {
        heading: 'How do I access the Medor Roster website?',
        text: 'To access the Medor Roster website, you need to have a registration link provided by your admin. Once you have the link, simply navigate to the website though the link and enter your registration credentials to access the website and your information.'
    },
    {
        heading: 'What kind of information can I view on the Medor Roster website?',
        text: 'On the Medor Roster website, you can view information about your EVE Online character, such as their name, race, and skills.'
    },
    {
        heading: 'Can I register for the Medor Roster website without a registration code?',
        text: 'No, you cannot register for the Medor Roster website without a registration code provided by your admin.',
        id: 'registrationCode'
    },
    {
        heading: 'What if I have issues accessing my character information on the Medor Roster website?',
        text: 'If you have any issues accessing your character information on the Medor Roster website, please contact your admin for assistance.'
    },
    {
        heading: 'Is the Medor Roster website affiliated with EVE Online?',
        text: 'No, the Medor Roster website is not affiliated with EVE Online or its parent company CCP Games.'
    },
]

const FAQPage: React.FC = () => {

    return <main className="without-img-as-bg-footer text-black">
        <h1 className="text30-48 font-bold">Frequently Asked Questions (FAQ)</h1>
        <Paragraphs
            className="gap-y-5 mt-5 sm:mt-10"
            itemClassNames={{
                headingClassName: 'text20-30 font-semibold',
                textClassName: 'text16-18'
            }}
            data={data}
        />
    </main>
};

export default FAQPage;