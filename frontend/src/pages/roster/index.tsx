import { useEffect } from "react";
import useGetRoster from "../../api/roster/useGetRoster";
import Characters from "../../ui/characters";
import PageInitialization from "../../ui/pageInitialization";

const RosterPage: React.FC = () => {
  const { data, isLoading, refetch } = useGetRoster();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <PageInitialization pathIfUnauth='/login'>
      <main className="py-5">
        <section className="w-[600px] mx-auto my-5">
          <Characters
            data={data || []}
            isLoading={isLoading}
            refetch={refetch}
            actions={["Delete", "Update"]}
          />
        </section>
      </main>
    </PageInitialization>
  );
};

export default RosterPage;
