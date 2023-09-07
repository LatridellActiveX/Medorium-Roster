import { Link } from "react-router-dom";
import useGetCharacters from "../../api/characters/useGetCharacters";
import Characters from "../../ui/characters";
import PageInitialization from "../../ui/pageInitialization";
import CharacterWrapper from "./characterWrapper";
import useCurrentUser from "../../hooks/useCurrentUser";

const MainPage: React.FC = () => {
  const { data: characters = [], isLoading, refetch } = useGetCharacters();
  const { currentUser } = useCurrentUser();

  return (
    <PageInitialization pathIfUnauth="/login">
      <main className="flex items-center flex-col max-w-[600px] mx-auto">
        <section className="mt-5">
          <h2 className="text20-36 font-bold">Your characters:</h2>
          <Characters
            className="mt10-20"
            data={characters}
            isLoading={isLoading}
            ItemWrapper={CharacterWrapper}
            noCharactersSign={
              <Link to="/dashboard?create=true">Create one</Link>
            }
            refetch={refetch}
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
      </main>
    </PageInitialization>
  );
};

export default MainPage;
