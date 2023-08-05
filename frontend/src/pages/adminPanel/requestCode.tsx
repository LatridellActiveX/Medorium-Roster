import { useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import Tooltip from "../../ui/tooltip";
import cn from 'classnames';


const baseUrl = 'http://localhost:5173'; //env variable in the future

const RequestCode: React.FC = () => {
    const [regCode, setRegCode] = useState<string>('');

    const fetchRegCode = async () => {
        setRegCode('');

        try {
            let resp: { data: { code: string } } = await toast.promise(
                // await axios.get('auth/accessCode'),
                new Promise((res, rej) => {
                    setTimeout(() => {
                        res({
                            data: {
                                code: 'LoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsum'
                            }
                        })
                    }, 1000);
                }),
                {
                    pending: 'Pending...',
                    success: 'Code successfully copied to clipboard',
                    error: 'Something went wrong...'
                }
            );

            let code = resp.data?.code;

            if (code) {
                let urlWithCode = `${baseUrl}/registration?accessCode=${code}`;

                setRegCode(urlWithCode);
                navigator.clipboard.writeText(urlWithCode);
            };
        } catch (e) {
            console.error(e);
        }
    };

    const handleCodeClick = () => {
        if (!!regCode) {
            navigator.clipboard.writeText(regCode);
            toast.success('Code successfully copied to clipboard');
        }
    };

    return <section className="mt-10">
        <div className="flex flex-col gap-y-5">
            <button
                className="bg-blue-600 hover:bg-blue-500 w-fit disabled:bg-gray-500 disabled:cursor-not-allowed text-white text-base font-bold py-2 rounded-md cursor-pointer transition-colors px-4"
                onClick={fetchRegCode}
            >
                Request registration code
            </button>
            <div className="flex flex-col gap-y-2.5">
                <label htmlFor='regCode'>Registration code:</label>
                <Tooltip
                    containerClassName='w-full max-w-lg'
                    text='Click to copy the code'
                    shouldHide={!!regCode === false}
                >
                    <textarea
                        className={cn(
                            "w-full min-h-[90px] rounded-md bg-[#535353] p-1",
                            !!regCode && 'cursor-pointer',
                        )}
                        value={regCode}
                        onChange={() => {}}
                        onClick={handleCodeClick}
                        id='regCode'
                    />
                </Tooltip>
            </div>
        </div>
    </section>
};

export default RequestCode;