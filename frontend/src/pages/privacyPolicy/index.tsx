import Footer from "../../layout/footer";
import Paragraphs from "../../ui/paragraphs";
import { ParagraphType } from "../../ui/paragraphs/paragraph";

const data: ParagraphType[] = [
    {
        heading: 'Personal Information We Collect',
        texts: [
            'When you visit the Medor Roster website, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Medor Roster website, we collect information about the individual web pages that you view, what websites or search terms referred you to the Medor Roster website, and information about how you interact with the Medor Roster website.',
            'When you register for the Medor Roster website, you will be asked to submit your email address and password. An invatation link will be automaticly added from the URL. We use this information to allow you access to the Medor Roster website.'
        ]
    },
    {
        heading: 'We collect information using the following technologies:',
        texts: [
            [
                {
                    text: '"Cookies"',
                },
                'are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit',
                {
                    text: 'http://www.allaboutcookies.org',
                    effect: 'link'
                },
                '.'
            ],
            [
                {
                    text: '"Log files"',
                },
                'track actions occurring on the Medor Roster website, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.'
            ],
            [
                {
                    text: '"Web beacons"',
                    shouldAddSpace: false,
                },
                ',',
                {
                    text: '"tags"',
                },
                'and',
                {
                    text: '"pixels"',
                },
                'are electronic files used to record information about how you browse the Website.'
            ],
        ]
    },
    {
        heading: 'Sharing Your Personal Information',
        texts: 'We do not share your Personal Information with third parties.We may share your Personal Information to comply with applicable laws and regulations.'
    },
    {
        heading: 'Your Rights',
        texts: 'You have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.'
    },
    {
        heading: 'Data Retention',
        texts: 'We will retain your Personal Information only for as long as necessary to provide you with access to the Medor Roster website and as described in this Privacy Policy.'
    },
    {
        heading: 'Changes',
        texts: 'We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.'
    },
    {
        heading: 'Contact Us',
        texts: [
            [
                'For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at',
                {
                    text: 'privacy@medorRoster.comor',
                    effect: 'email'
                },
                'using the details provided below:',
            ],
            'Medor Roster, USA, city.',
        ]
    },
];

const PrivacyPolicyPage: React.FC = () => {
    return <main className="px-4 flex flex-col justify-center items-center">
        <section className="max-w-2xl">
            <div className="flex flex-col items-center">
                <h1 className="text-2xl sm:text-3xl font-bold mt-5 sm:mt-10">Privacy Policy</h1>
                <p className="text16-18 text-center mt-2.5 sm:mt-5 max-w-xl">This Privacy Policy describes how your personal information is collected, used, and shared when you visit the Medor Roster website</p>
            </div>
            <Paragraphs
                className="gap-y-5 mt-5 sm:gap-y-8 sm:mt-10"
                itemClassNames={{
                    className: 'gap-y-3',
                    headingClassName: 'text18-20 font-semibold',
                    textsContainerClassName: 'gap-y-2',
                    textClassName: 'text16-18'
                }}
                data={data}
            />
        </section>
        <Footer />
    </main>
};

export default PrivacyPolicyPage;