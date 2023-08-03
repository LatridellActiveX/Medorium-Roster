import Characters from "../../ui/characters";
import useRoster from "../../hooks/useRoster";

const RosterPage: React.FC = () => {
  const roster = useRoster();

  return <main className="py-5">
    <section className="w-[600px] mx-auto">
      <Characters roster={roster} />
    </section>
  </main>
};

export default RosterPage;
