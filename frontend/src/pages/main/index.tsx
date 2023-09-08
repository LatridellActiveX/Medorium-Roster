import { Link } from "react-router-dom";
import useGetCharacters from "../../api/characters/useGetCharacters";
import Characters from "../../ui/characters";
import PageInitialization from "../../ui/pageInitialization";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useState } from "react";
import PlusIcon from "../../icons/plus";
import CreateCharacterModal from "./createCharacterModal";

const MainPage: React.FC = () => {
  const { data: characters = [], isLoading, refetch } = useGetCharacters();
  const { currentUser } = useCurrentUser();
  const [isModal, setIsModal] = useState(false);

  const handleModalStatus = () => {
    setIsModal((prev) => !prev);
  };

  let isThereMain = characters.find((c) => c.main);

  return (
    <PageInitialization pathIfUnauth="/login">
      <main className="flex items-center flex-col max-w-[600px] mx-auto">
        <section className="mt-5">
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
            data={characters}
            isLoading={isLoading}
            noCharactersSign={
              <Link to="/dashboard?create=true">Create one</Link>
            }
            refetch={refetch}
            actions={[
              {
                action: "Delete",
                url: "/api/characters",
              },
              {
                action: "Update",
                url: "/api/characters",
              },
            ]}
          />
        </section>
        {currentUser.isAdmin && (
          <section className="w-full mt-10">
            <Link className="block w-fit" to="/adminPanel">
              <h2 className="text20-36 font-bold">Admin panel:</h2>
            </Link>
            <div className="mt-5">
              <p>Something else later...</p>
            </div>
          </section>
        )}

        <CreateCharacterModal
          isThereMain={isThereMain !== undefined}
          isOpen={isModal}
          onClose={handleModalStatus}
          refetch={refetch}
        />
      </main>
    </PageInitialization>
  );
};

export default MainPage;
