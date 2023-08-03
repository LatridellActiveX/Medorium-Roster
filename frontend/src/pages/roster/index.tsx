import useGetRoster from "../../api/roster/useGetRoster";
import Characters from "../../ui/characters";

const RosterPage: React.FC = () => {
  const { data } = useGetRoster();

  return <main className="py-5">
    <section className="w-[600px] mx-auto">
      <Characters data={data || []} />
    </section>
  </main>
};

export default RosterPage;
