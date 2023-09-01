import Characters from "../../ui/characters";
import { useEffect, useState } from "react";
import CreateCharacterModal from "./createCharacterModal";
import PlusIcon from "../../icons/plus";
import useGetCharacters from "../../api/characters/useGetCharacters";
import PageInitialization from "../../ui/pageInitialization";
import { ResponseCharacters } from "api/types";

const DashboardPage: React.FC = () => {
  const { data, isFetching, refetch, isPreviousData} = useGetCharacters();
  const [isModal, setIsModal] = useState(false);
  const [characters, setCharacters] = useState<ResponseCharacters>([]);

  useEffect(() => {
    if (!data) return;
    if (data.length > characters.length && characters.length === 0) {
      setCharacters(data);
      return;
    }

    if (!isPreviousData) {
      setCharacters(data);
    }
  }, [data]);

  const handleModalStatus = () => {
    setIsModal((prev) => !prev);
  };

  let isThereMain = characters.find((c) => c.main);

  return (
    <PageInitialization pathIfUnauth="/login">
      <main className="py-5">
        <section className="max-w-[600px] mx-auto">
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
            refetch={refetch}
            actions={["Delete", "Update"]}
          />

          <CreateCharacterModal
            isThereMain={isThereMain !== undefined}
            isOpen={isModal}
            onClose={handleModalStatus}
            refetch={refetch}
          />
        </section>
      </main>
    </PageInitialization>
  );
};

export default DashboardPage;
