import { useMemo } from "react";
import FormBase, { FormInputType } from "../../ui/formBase";
import ModalBase from "../../ui/modalBase";
import * as Yup from "yup";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  isThereMain: boolean;
};

const initialValues = {
  name: "",
  main: "alt",
};
const validationSchema = Yup.object({
  name: Yup.string()
    .max(37, "Must be 37 characters or less")
    .min(3, "Your name is too short")
    .required("Required"),
  main: Yup.string().oneOf(["alt", "main"]).required("Required"),
});

const CreateCharacterModal: React.FC<Props> = ({ isOpen, onClose, isThereMain }) => {
  const inputs: FormInputType[] = useMemo(() => {
    return [
      "Name",
      {
        label: "Main/Alt",
        name: "main",
        variant: "select",
        selectItems: [
          "alt",
          {
            text: "main",
            isDisabled: isThereMain,
          },
        ],
      },
    ];
  }, [isThereMain]);

  if (!isOpen) {
    return <></>;
  }

  const onSubmitSuccess = async (values: { [key: string]: string }) => {
    onClose();
  };
  const formatRequestData = (data: { [key: string]: string }) => {
    return {
      name: data.name,
      main: data.main === "main",
    };
  };

  return (
    <ModalBase
      className="bg-neutral-800 p-2 pb-0"
      isOpen={isOpen}
      onClose={onClose}
    >
      <FormBase
        apiUrl="http://localhost:3000/api/characters"
        heading="Create a new character"
        submitBtnSign="Add character"
        initialValues={initialValues}
        validationSchema={validationSchema}
        inputs={inputs}
        onSubmitSuccess={onSubmitSuccess}
        formatRequestData={formatRequestData}
      ></FormBase>
    </ModalBase>
  );
};

export default CreateCharacterModal;
