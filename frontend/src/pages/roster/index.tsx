import useFetch from "../../api/hooks/useFetch";
import Characters from "../../ui/characters";

const RosterPage: React.FC = () => {
  const { data } = useFetch("/api/roster");

  return <main className="py-5">
    <section className="w-[600px] mx-auto">
      <Characters data={data || []} />
    </section>
  </main>
};

export default RosterPage;
