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
            <div className="flex items-center gap-x-2">
                <h6 className="text-[22px] font-bold">Registration code:</h6>
                <Tooltip text="Click to copy the code" shouldHide={!!regCode === false}>
                    <p
                        className={cn(
                            'max-w-[500px] overflow-hidden whitespace-nowrap text-ellipsis',
                            !!regCode && 'cursor-pointer text-blue-700'
                        )}
                        onClick={handleCodeClick}
                    > {regCode || 'Click "Request Registration Code" to get the code.'}
                    </p>
                </Tooltip>
            </div>

            {/* <label htmlFor='regCode'>Registration code:</label>
                <Tooltip
                    className="w-full max-w-lg"
                    text={
                        !!regCode === false
                            ? 'Click "Request Registration Code" to get the code'
                            : 'Click to copy the code'
                    }
                >
                    <div className="relative">
                        <textarea
                            className={cn(
                                "w-full min-h-[90px]",
                                !!regCode && 'cursor-pointer',
                            )}
                            value={regCode}
                            id='regCode'
                            disabled
                        />
                        <div className="absolute w-full h-full top-0 left-0" onClick={handleCodeClick} />
                    </div>
                </Tooltip> */}
        </div>
    </section>
};

export default RequestCode;