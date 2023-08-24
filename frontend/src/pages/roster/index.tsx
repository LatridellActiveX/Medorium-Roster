import useGetRoster from "../../api/roster/useGetRoster";
import Characters from "../../ui/characters";

const RosterPage: React.FC = () => {
  const { data, isLoading, refetch } = useGetRoster();

  return (
    <main className="py-5">
      <section className="w-[600px] mx-auto my-5">
        <Characters data={data || []} isLoading={isLoading} refetch={refetch} actions={['Delete', 'Update']} />
      </section>
    </main>
  );
};

export default RosterPage;
