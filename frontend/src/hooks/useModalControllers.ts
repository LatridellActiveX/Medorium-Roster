import { useLocation, useNavigate } from "react-router-dom";
import connectWords from "../helpers/connectWords";

export type ModalQueryType =
  | string
  | {
      name: string;
      id: string;
    };

const useModalControllers = (query: ModalQueryType) => {
  const navigate = useNavigate();
  const location = useLocation();

  const formattedQuery =
    typeof query === "string"
      ? connectWords(query)
      : connectWords(`${query.id}_${query.name}`);

  const openModalSearch = {
    search: `${formattedQuery}=true`,
  };

  const openModal = () => {
    navigate(openModalSearch);
  };
  const closeModal = () => {
    navigate({
      search: "",
    });
  };

  return {
    openModal,
    closeModal,
    openModalSearch, //if you wish to open a modal via link (e.g. to={openModalSearch})
    modalQuery: formattedQuery,
    isOpen: location.search.includes(formattedQuery),
  };
};

export default useModalControllers;
