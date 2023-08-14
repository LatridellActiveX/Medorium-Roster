import { Link, LinkProps } from "react-router-dom";
import textToURL from "../../../../../helpers/textToURL";

type Props = {
  page: string;
} & Omit<LinkProps, 'to'>;

const Page: React.FC<Props> = ({ page, ...props }) => {
  return (
    <Link
      className="w-full first-letter:capitalize"
      to={`/${textToURL(page)}`}
      {...props}
    >
      {page}
    </Link>
  );
};

export default Page;
