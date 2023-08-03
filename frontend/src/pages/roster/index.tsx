import useGetRoster from "../../api/roster/useGetRoster";

const RosterPage: React.FC = () => {
  const { data: roster } = useGetRoster();

  return <main className="py-5">
    <section className="w-[600px] mx-auto">
      <Characters roster={roster} />
    </section>
  </main>
};

export default RosterPage;
