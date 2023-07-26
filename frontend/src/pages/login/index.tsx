import useAuthRedirect from "../../hooks/useAuthRedirect";
import PageInitialization from "../../ui/pageInitialization";
import LoginForm from "./loginForm";

/** Type description
 * This is a Type definition for a custom type in Typescript.  
 * 
 * Props is the Type alias
 * onRegToggle and adminToggle are set as functions that have a parameter for a response that is a boolean. 
 */

// type Props = { 
//     onRegToggle: (response: boolean) => void
//     adminToggle: (response: boolean) => void
// }

/** Component Description
 * <props> is a generic type paremeter for this functional component,
 *  this tells typescript that this component expects to recieve the props defined in the above Props type
 *  
 * A generic type parameter is a placeholder that allows you to create reusable components or functions with flexible types. 
 * 
 */
const LoginPage: React.FC = () => {
    useAuthRedirect('/');

    return <PageInitialization>
        <main className="flex flex-col items-center">
            <h2 className=" text-black font-bold my-2">Login</h2>
            <LoginForm />
        </main>
    </PageInitialization>
};

export default LoginPage;