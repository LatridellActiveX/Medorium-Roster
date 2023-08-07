import useGetRoster from "../../api/roster/useGetRoster";
import Characters from "./characters";

const RosterPage: React.FC = () => {
  const { data: roster } = useGetRoster();

  return (
    <main className="">
      <div className="my-5">
        <section className="w-[600px] mx-auto">
          <Characters roster={roster} />
        </section>
      </div>
    </main>
  );
};

export default RosterPage;
