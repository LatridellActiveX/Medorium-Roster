import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import Arrow from "./arrow";
import { Component, useEffect, useRef } from "react";

type Props = {
  items: object[]; //all items
  setItems: (items: Props["items"]) => void;
  itemsPerPage: number;
  forcePage?: number;
  setForcePage?: (page: number | undefined) => void;
};

const Pagination: React.FC<Props> = ({
  items,
  setItems,
  itemsPerPage,
  forcePage,
  setForcePage,
}) => {
  const paginationRef = useRef<Component<ReactPaginateProps>>(null);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const pageCount = Math.ceil(items?.length / itemsPerPage);
  const itemOffset = Number(searchParams.get("offset")) || 0;
  const urlCurrnetPage = itemOffset / itemsPerPage;

  const handlePageClick: ReactPaginateProps["onPageChange"] = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items?.length;

    navigate({
      pathname: location.pathname,
      search: `offset=${newOffset}`,
    });
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const newItems = items.slice(itemOffset, endOffset);

    setItems(newItems);
  }, [items, itemOffset]);

  useEffect(() => {
    if (!paginationRef.current || !setForcePage || pageCount === 0) return;

    const currentPage = (paginationRef.current.state as { selected: number })
      .selected;

    if (pageCount <= urlCurrnetPage) {
      setForcePage(0);
      return;
    }

    if (currentPage !== urlCurrnetPage) {
      setForcePage(urlCurrnetPage);
      return;
    }
  }, [paginationRef, urlCurrnetPage, pageCount]);

  useEffect(() => {
    //cleanup
    if (forcePage === undefined || !setForcePage) return;

    setForcePage(undefined);
  }, [forcePage, setForcePage]);

  if (pageCount <= 1) {
    return <></>;
  }

  return (
    <ReactPaginate
      className="flex items-center gap-x-4 w-fit mx-auto mt-20 esm:gap-x-8"
      pageClassName="text-esm text-white transition-colors"
      activeClassName="font-bold [&>a]:text-white"
      disabledClassName="opacity-70 pointer-events-none"
      breakLabel={<p className="text-grey2 transition-colors">...</p>}
      nextLabel={<Arrow className="rotate-90" />}
      onPageChange={handlePageClick}
      pageCount={pageCount}
      previousLabel={<Arrow className="-rotate-90" />}
      renderOnZeroPageCount={null}
      forcePage={forcePage}
      ref={paginationRef}
    />
  );
};

export default Pagination;
