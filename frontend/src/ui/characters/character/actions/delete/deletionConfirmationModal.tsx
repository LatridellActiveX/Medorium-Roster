import { toast } from "react-toastify";
import axios from "../../../../../api/axios";
import ModalBase from "../../../../modalBase";
import { AxiosError } from "axios";

type Props = {
  isOpen: boolean;
  username: string;
  characterName: string;
  onClose: () => void;
  refetch: () => void;
};

const DeletionConfirmationModal: React.FC<Props> = ({
  isOpen,
  username,
  onClose,
  characterName,
  refetch,
}) => {

  const deleteCharacter = async () => {
    try {
      await axios.delete(`api/users/${username}/characters/${characterName}`);
      onClose();
      refetch();
    } catch (e) {
      let error = e as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <ModalBase
      className="w-full max-w-[450px] shadow-2xl p-4 bg-c-primary"
      isOpen={isOpen}
      onClose={onClose}
    >
      <h2 className="text-center text-2xl">
        Are you sure you want to <strong>delete</strong>
        <br />
        the {characterName} character?
      </h2>
      <div className="flex gap-x-4 mt-5">
        <button
          className="bg-c-red hover:bg-c-red/80 text-white text-base font-bold py-2 rounded-md cursor-pointer w-full transition-colors mt-5 mb-6"
          onClick={deleteCharacter}
        >
          Yes, I do
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white text-base font-bold py-2 rounded-md cursor-pointer w-full transition-colors mt-5 mb-6"
          onClick={onClose}
        >
          Nevermind
        </button>
      </div>
    </ModalBase>
  );
};

export default DeletionConfirmationModal;
