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
        <section className="w-[600px] mx-auto my-5 space-y-2">
          <div className="flex justify-between" id="options">
            <div className="flex gap-2">
              {/* sort */}
              <div className="flex flex-col">
                <label htmlFor="sort">Sort By</label >
                <select id="sort">
                  <option value="date-added">Date Added</option>
                </select>
              </div>

              {/* filter */}
              <div className="flex flex-col">
                <label htmlFor="filter">Filter</label >
                <select id="filter">
                  <option value="none" defaultChecked>None</option>
                </select>
              </div>
            </div>

            {/* search */}
            <div className="flex items-end">
              <input className="select" type="text" placeholder="Search..." />
            </div>
          </div>

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
