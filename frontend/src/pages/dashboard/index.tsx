import Characters from "../../ui/characters";
import { useState } from 'react';
import CreateCharacterModal from "./createCharacterModal";
import PlusIcon from "../../icons/plus";
import useGetRoster from "../../api/roster/useGetRoster";

const DashboardPage: React.FC = () => {
    const { data: roster } = useGetRoster();
    const [isModal, setIsModal] = useState(false);

    const handleModalStatus = () => {
        setIsModal(prev => !prev);
    };

    return <main className="py-5">
        <section className="max-w-[600px] mx-auto">
            <CreateCharacterModal isOpen={isModal} onClose={handleModalStatus} />

            <div className="flex items-center justify-between gap-x-2">
                <h1 className="text20-36">Your characters</h1>
                <button
                    className="flex items-center justify-between gap-x-3 border border-white rounded-sm transition-colors py-2 px-4 hover:bg-c-primary"
                    onClick={handleModalStatus}
                >
                    Add new
                    <PlusIcon />
                </button>
            </div>
            <Characters className="mt10-20" data={roster || []} />
        </section>
    </main>
};

export default DashboardPage;