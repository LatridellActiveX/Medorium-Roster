import { Link, LinkProps } from "react-router-dom";
import { PageRoute } from ".";

type Props = {
  page: PageRoute;
} & Omit<LinkProps, 'to'>;

const Page: React.FC<Props> = ({ page, ...props }) => {
  return (
    <Link
      className="w-full first-letter:capitalize"
      to={page.route}
      {...props}
    >
      {page.name}
    </Link>
  );
};

export default Page;
