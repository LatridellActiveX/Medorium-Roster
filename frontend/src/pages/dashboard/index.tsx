import Characters from "../../ui/characters";
import { useState } from "react";
import CreateCharacterModal from "./createCharacterModal";
import PlusIcon from "../../icons/plus";
import useGetCharacters from "../../api/characters/useGetCharacters";
import PageInitialization from "../../ui/pageInitialization";

const DashboardPage: React.FC = () => {
  const { data: characters, isFetching } = useGetCharacters();
  const [isModal, setIsModal] = useState(false);

  const handleModalStatus = () => {
    setIsModal((prev) => !prev);
  };

  return (
    <PageInitialization pathIfUnauth="/login">
      <main className="py-5">
        <section className="max-w-[600px] mx-auto">
          <CreateCharacterModal
            isThereMain={(characters || []).length > 1}
            isOpen={isModal}
            onClose={handleModalStatus}
          />

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
          <Characters
            className="mt10-20"
            data={characters || []}
            isLoading={isFetching}
          />
        </section>
      </main>
    </PageInitialization>
  );
};

export default DashboardPage;
