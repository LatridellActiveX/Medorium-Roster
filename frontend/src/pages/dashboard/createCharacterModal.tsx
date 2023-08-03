import FormBase, { FormInputType } from "../../ui/formBase";
import ModalBase from "../../ui/modalBase";
import * as Yup from 'yup';

type Props = {
    isOpen: boolean
    onClose: () => void
}

const initialValues = {
    name: '',
    'main/alt': '',
}
const validationSchema = Yup.object({
    name: Yup.string()
        .max(32, 'Must be 32 characters or less')
        .min(6, 'Your name is too short')
        .required('Required'),
        'main/alt': Yup.string()
        .oneOf(["alt", "main"])
        .required('Required'),
})
const inputs: FormInputType[] = [
    'Name',
    {
        name: 'Main/Alt',
        variant: 'select',
        selectItems: [
            'alt',
            'main',
        ]
    }
];


const CreateCharacterModal: React.FC<Props> = ({ isOpen, onClose }) => {

    if (!isOpen) {
        return <></>
    };

    const onSubmitSuccess = (values: { [key: string]: string }) => {
        onClose();
    };

    return <ModalBase className='bg-neutral-800 p-2 pb-0' title='some title' isOpen={isOpen} onClose={onClose}>
        <FormBase
            initialValues={initialValues}
            validationSchema={validationSchema}
            apiUrl='http://localhost:3000/api/character'
            onSubmitSuccess={onSubmitSuccess}
            heading='Create a new character'
            submitBtnSign="Create"
            inputs={inputs}
        >
        </FormBase>
    </ModalBase>
};

export default CreateCharacterModal;