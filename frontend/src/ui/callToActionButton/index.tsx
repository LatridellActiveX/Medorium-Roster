import { Link } from "react-router-dom";
import "./index.css";

type Props = {
  to: string;
};
/**
 * 
 * @param to - url to navigate to 
 * @returns Call to action button component
 * @see index.css in same directory for styling
 */
const CallToActionButton: React.FC<Props> = ({ to }) => {
  return (
    <Link
      to={to}
      className="call-to-action"
    >
      Get Started
    </Link>
  );
};

export default CallToActionButton;
