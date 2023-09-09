import { Link } from "react-router-dom";
import useGetCharacters from "../../api/characters/useGetCharacters";
import Characters from "../../ui/characters";
import PageInitialization from "../../ui/pageInitialization";
import useCurrentUser from "../../hooks/useCurrentUser";
import PlusIcon from "../../icons/plus";
import CreateCharacterModal from "./createCharacterModal";
import useModalControllers from "../../hooks/useModalControllers";

const MainPage: React.FC = () => {
  const { data: characters = [], isLoading, refetch } = useGetCharacters();
  const { currentUser } = useCurrentUser();
  const { openModalSearch, modalQuery, closeModal, openModal } = useModalControllers("create");

  return (
    <PageInitialization pathIfUnauth="/login">
      <main className="flex items-center flex-col max-w-[600px] mx-auto">
        <section className="mt-5">
          <div className="flex items-center justify-between gap-x-2">
            <h1 className="text20-36">Your characters</h1>
            <button
              className="flex items-center justify-between gap-x-3 border border-white rounded-sm transition-colors py-2 px-4 hover:bg-c-primary"
              onClick={openModal}
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
              <Link to={openModalSearch}>Create one</Link>
            }
            refetch={refetch}
            actions={[
              {
                action: "Delete",
                admin: false,
              },
              {
                action: "Update",
                admin: false,
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
          query={modalQuery}
          onClose={closeModal}
          refetch={refetch}
        />
      </main>
    </PageInitialization>
  );
};

export default MainPage;
