import Characters from "../../ui/characters";
import { useEffect, useState } from "react";
import CreateCharacterModal from "./createCharacterModal";
import PlusIcon from "../../icons/plus";
import useGetCharacters from "../../api/characters/useGetCharacters";
import PageInitialization from "../../ui/pageInitialization";
import { ResponseCharacters } from "api/types";

const DashboardPage: React.FC = () => {
  const { data, isFetching, refetch } = useGetCharacters();
  const [isModal, setIsModal] = useState(false);
  const [characters, setCharacters] = useState<ResponseCharacters>([]);

  useEffect(() => {
    if (!data) return;
    if (data.length > characters.length && characters.length === 0) {
      setCharacters(data);
      return;
    }

    let operation: "add" | "delete" =
      data.length > characters.length ? "add" : "delete";

    if (operation === "add") {
      let newCharacter = data.filter(
        (dataItem) =>
          !characters.some((character) => dataItem.name === character.name)
      )[0];

      setCharacters((prev) => [...prev, newCharacter]);
    } else {
      let deletedCharacter = characters.filter(
        (dataItem) =>
          !data.some((character) => dataItem.name === character.name)
      )[0];
      
      setCharacters((prev) => prev.filter((i) => i.name !== deletedCharacter.name));
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
            actions={["Delete"]}
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
