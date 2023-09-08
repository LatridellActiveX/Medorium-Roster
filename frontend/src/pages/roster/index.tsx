import { useEffect, useState } from "react";
import useGetRoster from "../../api/roster/useGetRoster";
import Characters, { Filter, Sort } from "../../ui/characters";
import PageInitialization from "../../ui/pageInitialization";
import useCurrentUser from "../../hooks/useCurrentUser";

const RosterPage: React.FC = () => {
  const { data, isLoading, refetch } = useGetRoster();
  const { currentUser } = useCurrentUser();

  const [filter, setFilter] = useState<Filter>("Default");
  const [sort, setSort] = useState<Sort>("Default");

  const [search, setSearch] = useState("");

  useEffect(() => {
    refetch();
  }, []);

  return (
    <PageInitialization pathIfUnauth="/login">
      <main className="py-5">
        <section className="w-[600px] mx-auto my-5 space-y-2">
          <div className="flex justify-between" id="options">
            <div className="flex gap-2">
              {/* sort */}
              <div className="flex flex-col">
                <label htmlFor="sort">Sort By</label>
                <select
                  id="sort"
                  onChange={(e) => {
                    setSort(e.target.value as Sort);
                  }}
                >
                  <option value="Default">Date Added</option>
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                </select>
              </div>

              {/* filter */}
              <div className="flex flex-col">
                <label htmlFor="filter">Filter</label>
                <select
                  id="filter"
                  onChange={(e) => {
                    setFilter(e.target.value as Filter);
                  }}
                >
                  <option value="Default">None</option>
                  <option value="Main">Main</option>
                  <option value="Alt">Alt</option>
                </select>
              </div>
            </div>

            {/* search */}
            <div className="flex items-end">
              <input
                className="select"
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>

          <Characters
            data={data || []}
            isLoading={isLoading}
            refetch={refetch}
            actions={currentUser.isAdmin ? [{ action: "Delete", admin: true }, { action: "Update", admin: true }] : []}
            filter={filter}
            sort={sort}
            search={search}
          />
        </section>
      </main>
    </PageInitialization>
  );
};

export default RosterPage;
