import { Link } from "react-router-dom";
import "./index.css";

type Props = {
  to: string;
};

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
