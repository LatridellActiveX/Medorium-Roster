import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import Arrow from "./arrow";
import { useEffect, useState } from "react";

type Props = {
  items: any[]; //all items
  setItems: (items: Props["items"]) => void;
  itemsPerPage: number;
  reset?: boolean;
  setReset?: (reset: boolean) => void;
};

const Pagination: React.FC<Props> = ({
  items, //all items
  setItems,
  itemsPerPage,
  reset,
  setReset,
}) => {
  const [itemOffset, setItemOffset] = useState(0);

  const pageCount = Math.ceil(items.length / itemsPerPage);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);

  const handlePageClick: ReactPaginateProps["onPageChange"] = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;

    setItemOffset(newOffset);
  };

  useEffect(() => {
    setItems(currentItems);
  }, [itemOffset]);

  useEffect(() => {
    //cleanup
    if (!reset || !setReset) return;

    setReset(false);
  }, [reset, setReset]);

  if (pageCount <= 1) {
    return <></>;
  }

  return (
    <ReactPaginate
      className="flex items-center gap-x-4 w-fit mx-auto mt-5 esm:gap-x-8"
      pageClassName="text-esm text-white transition-colors"
      activeClassName="font-bold [&>a]:text-white"
      disabledClassName="opacity-70 pointer-events-none"
      breakLabel={<p className="text-grey2 transition-colors">...</p>}
      nextLabel={<Arrow className="rotate-90" />}
      onPageChange={handlePageClick}
      pageCount={pageCount}
      previousLabel={<Arrow className="-rotate-90" />}
      renderOnZeroPageCount={null}
      forcePage={reset ? 0 : undefined}
    />
  );
};

export default Pagination;
