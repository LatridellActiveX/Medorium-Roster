import PageInitialization from "../../ui/pageInitialization";
import background from "../../assets/backgrounds/Athanor.png"
import TextAreaForm from "../../ui/textArea/tAreaForm";
import * as Yup from "yup";
import { textAreaInputType } from "../../ui/textArea/tAreaForm";

const FinancialPage: React.FC = () => {

    //regex that only allows numbers, commas, minus sign, alphabet, spaces, colon and periods
    const regex = /^[0-9a-zA-Z ,-.:]+$/;

    //yup validation schema object that tests strings based on regex above

    const validationSchema = Yup.object({
        transactionInput: Yup.string()
          .matches(regex, "Only numbers, commas, minus sign, alphabet, spaces, colon and periods are allowed")
          .required("Required"),
      });

    //form input data object
    const inputs: textAreaInputType = {
            label: 'transactions',
            name: 'transactionInput',
            placeholder: 'Enter financial data here',
            required: false,
        }
    
      //initial values for form
    const initialValues = {
        transactionInput: "",
      }; 
  

    return(
        <PageInitialization>
            <main style={{backgroundImage: `url(${background})`}} className="bg-cover bg-center flex justify-center items-center">
                <div className="flex flex-col items-center justify-center bg-gray-500 bg-opacity-50 rounded-xl w-1/4">
                    <TextAreaForm classNames={'w-full h-64 flex flex-col justify-center'} isH1Heading={false} initialValues={initialValues} validationSchema={validationSchema} apiUrl="financials" onSubmitSuccess={() => {}} heading="Transactions Parser" inputs={inputs} />
                </div>
            </main>
        </PageInitialization>
    )
}

export default FinancialPage;

                           


