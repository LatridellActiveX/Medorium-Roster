import { ResponseCharacter } from "api/types";
import ModalBase from "../../../../modalBase";
import { useEffect, useMemo } from "react";
import FormBase, {
  FormBaseInputType,
  FormInputType,
} from "../../../../formBase";
import { AxiosResponse } from "axios";
import * as Yup from "yup";

type Props = {
  character: ResponseCharacter;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(37, "Must be 37 characters or less")
    .min(3, "Your username is too short")
    .required("Required"),
  main: Yup.string().oneOf(["alt", "main"]).required("Required"),
  rank: Yup.string()
    .max(37, "Must be 37 characters or less") //questionable
    .min(3, "Your rank is too short"),
  division: Yup.string()
    .max(37, "Must be 37 characters or less") //questionable
    .min(3, "Your division is too short"),
  payGrade: Yup.string()
    .max(37, "Must be 37 characters or less") //questionable
    .min(3, "Your pay grade is too short"),
});

const UpdateModal: React.FC<Props> = ({
  character,
  onClose,
  isOpen,
  refetch,
}) => {
  const onSubmitSuccess = (
    values: FormBaseInputType,
    response: AxiosResponse
  ) => {
    console.log(values, response);

    refetch();
  };

  const formatRequestData = (character: FormBaseInputType) => {
    const characterCopy = { ...character };

    // for (const key of Object.keys(characterCopy)) {
    //   if (!characterCopy[key]) {
    //     characterCopy[key] = "";
    //   }
    // }

    return {
      username: character.username || 'usernameusern',
      name: character.name,
      character: {
        ...characterCopy,
        main: characterCopy.main === "main",
      },
    };
  };

  const initialValues: FormBaseInputType = useMemo(() => {
    //all fields must be specified because the user may be missing a field
    return {
      name: character.name,
      main: character.main,
      rank: character.rank,
      rankAcquisitionTimestamp: character.rankAcquisitionTimestamp,
      division: character.division,
      payGrade: character.payGrade,
    };
  }, [character]);

  const inputs: FormInputType[] = useMemo(() => {
    return [
      "name",
      {
        name: "main",
        variant: "select",
        selectItems: [
          "alt",
          {
            text: "main",
            isDisabled: character.main,
          },
        ],
      },
      {
        name: "rank",
        required: false,
      },
      {
        name: "division",
        required: false,
      },
      {
        name: "payGrade",
        label: "pay grade",
        required: false,
      },
      {
        name: "rankAcquisitionTimestamp",
        label: "rank acquisition timestamp",
        disabled: true,
        required: false,
      },
    ];
  }, [character]);

  // useEffect(() => {
  //   if (isOpen) return;

  //   setUpdatedCharacter(character); //cleanup
  // }, [isOpen]);

  return (
    <ModalBase
      className="min-w-[600px] bg-c-primary px-4 py-3"
      isOpen={isOpen}
      onClose={onClose}
    >
      <FormBase
        className="shadow-2xl"
        fieldContainerClassName="grid-cols-2 gap-x-4"
        initialValues={initialValues}
        validationSchema={validationSchema}
        apiUrl="api/characters"
        onSubmitSuccess={onSubmitSuccess}
        formatRequestData={formatRequestData}
        heading={
          <>
            Editing
            <span className="font-bold"> {character.name}</span>
          </>
        }
        apiMethod="put"
        inputs={inputs}
      />
    </ModalBase>
  );
};

export default UpdateModal;
