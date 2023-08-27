import { ResponseCharacter } from "api/types";
import ModalBase from "../../../../modalBase";
import { useMemo } from "react";
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

const UpdateCharacterModal: React.FC<Props> = ({
  character,
  onClose,
  isOpen,
  refetch,
}) => {
  const onSubmitSuccess = (
    _values: FormBaseInputType,
    _response: AxiosResponse
  ) => {
    onClose()
    refetch();
  };

  const formatRequestData = (updatedCharacter: FormBaseInputType) => {
    return {
      username: character.username, //must be original
      name: character.name, //must be original
      character: {
        ...updatedCharacter,
        username: character.username, //should be original?
        main: updatedCharacter.main === "main",
        payGrade: !!updatedCharacter.payGrade ? String(updatedCharacter.payGrade) : undefined
      },
    };
  };

  const validationSchema = useMemo(() => {
    const defaultSchema = Yup.string()
    .max(30, "Must be 30 characters or less")
    .min(3, "Must be 3 characters or more");
    const payGradeSchema = Yup.number()
    .test('numbers', 'Only numbers allowed', value => !value || /^[0-9]+$/.test(String(value)))
    .test('lessThanTen', 'Must be 10 characters or less', value => !value || value.toString().length <= 10)
    .test('moreThanTwo', 'Must be 2 characters or more', value => !value || value.toString().length >= 2)

    let schema = {
      name: Yup.string()
        .max(37, "Must be 37 characters or less")
        .min(3, "Must be 3 characters or more")
        .required("Required"),
      main: Yup.string().oneOf(["alt", "main"]).required("Required"),
      rank: !!character.rank ? defaultSchema.required('Required') : defaultSchema, //the API doesn't like it when we try to send an undefined value as a field value when the value has already been there
      division: !!character.division ? defaultSchema.required('Required') : defaultSchema,
      payGrade: !!character.payGrade ? payGradeSchema.required('Required') : payGradeSchema,
    };

    return Yup.object(schema);
  }, [character]);

  const initialValues: FormBaseInputType = useMemo(() => {
    //all fields must be specified because the user may be missing a field
    return {
      name: character.name,
      main: character.main ? "main" : "alt",
      rank: character.rank,
      rankAcquisitionTimestamp: character.rankAcquisitionTimestamp,
      division: character.division,
      payGrade: character.payGrade || 0,
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
        required: !!character.rank,
      },
      {
        name: "division",
        required: !!character.division,
      },
      {
        name: "payGrade",
        label: "pay grade",
        required: !!character.payGrade,
        type: 'number'
      },
      {
        name: "rankAcquisitionTimestamp",
        label: "rank acquisition timestamp",
        disabled: true, //should be updated from the backend. right?
        required: !!character.rankAcquisitionTimestamp,
      },
    ];
  }, [character]);

  if (!isOpen) {
    return <></>; //cleanup
  }

  return (
    <ModalBase
      className="w-full max-w-[600px] shadow-2xl"
      isOpen={isOpen}
      onClose={onClose}
    >
      <FormBase
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

export default UpdateCharacterModal;
