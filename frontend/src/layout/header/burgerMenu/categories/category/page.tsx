import { Link, LinkProps } from "react-router-dom";
import textToURL from "../../../../../helpers/textToURL";
import { PageRoute } from ".";

type Props = {
  page: PageRoute;
} & Omit<LinkProps, 'to'>;

const Page: React.FC<Props> = ({ page, ...props }) => {
  return (
    <Link
      className="w-full first-letter:capitalize"
      to={`${textToURL(page.route)}`}
      {...props}
    >
      {page.name}
    </Link>
  );
};

export default Page;
